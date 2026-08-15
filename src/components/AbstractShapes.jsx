import { useEffect, useRef, useState } from 'react';

/* Kept deliberately sparse: a handful of meteors at a time reads as weather
   behind the heading, while a dense shower would compete with it. */
const MAX_METEORS = 7;
const SPAWN_GAP_MIN = 0.9;
const SPAWN_GAP_MAX = 2.6;

/* Falling down-left, the direction a meteor reads most naturally. */
const ANGLE = (118 * Math.PI) / 180;
const DIR_X = Math.cos(ANGLE);
const DIR_Y = Math.sin(ANGLE);

/* Fallback matches the dark theme, which is what the site renders. */
const DEFAULT_METEOR_RGB = '255, 255, 255';

const createMeteor = (width, height) => {
  const length = 90 + Math.random() * 130;
  return {
    // Start off the top edge, biased right, so the travel crosses the section
    // rather than clipping a corner.
    x: width * (0.25 + Math.random() * 1.05),
    y: -length - Math.random() * height * 0.4,
    speed: 190 + Math.random() * 200,
    length,
    width: 1 + Math.random() * 0.6,
    alpha: 0.28 + Math.random() * 0.34,
  };
};

/* Every meteor starts above the frame, so a cold start would leave the section
   empty for the first second or so. Seeded ones get a head start along their
   own path, putting them mid-fall the moment the section is reached. */
const seedMeteor = (width, height) => {
  const meteor = createMeteor(width, height);
  const headStart = Math.random() * 2.4;
  meteor.x += DIR_X * meteor.speed * headStart;
  meteor.y += DIR_Y * meteor.speed * headStart;
  return meteor;
};

const drawMeteor = (ctx, meteor, rgb, accentRgb) => {
  const tailX = meteor.x - DIR_X * meteor.length;
  const tailY = meteor.y - DIR_Y * meteor.length;

  // The streak fades from a hot head back to nothing, so the tail dissolves
  // instead of ending on a hard cap.
  const gradient = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
  gradient.addColorStop(0, `rgba(${rgb}, ${meteor.alpha})`);
  gradient.addColorStop(0.35, `rgba(${accentRgb}, ${meteor.alpha * 0.5})`);
  gradient.addColorStop(1, `rgba(${accentRgb}, 0)`);

  ctx.save();
  ctx.strokeStyle = gradient;
  ctx.lineWidth = meteor.width;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(meteor.x, meteor.y);
  ctx.stroke();

  // A small bright point at the head.
  ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, meteor.alpha + 0.25)})`;
  ctx.beginPath();
  ctx.arc(meteor.x, meteor.y, meteor.width * 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const AbstractShapes = () => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Read the themed ink once, rather than per frame.
    const styles = getComputedStyle(document.documentElement);
    const meteorRgb = styles.getPropertyValue('--meteor-rgb').trim() || DEFAULT_METEOR_RGB;
    const accentRgb = styles.getPropertyValue('--meteor-accent-rgb').trim() || meteorRgb;

    let meteors = [];
    let width = 0;
    let height = 0;
    let rafId = null;
    let lastTime = null;
    let isOnScreen = true;
    let spawnIn = 0;
    let seeded = false;

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      for (const meteor of meteors) {
        drawMeteor(ctx, meteor, meteorRgb, accentRgb);
      }
    };

    const tick = (time) => {
      const dt = Math.min((time - (lastTime ?? time)) / 1000, 0.1);
      lastTime = time;

      spawnIn -= dt;
      if (spawnIn <= 0 && meteors.length < MAX_METEORS) {
        meteors.push(createMeteor(width, height));
        spawnIn = SPAWN_GAP_MIN + Math.random() * (SPAWN_GAP_MAX - SPAWN_GAP_MIN);
      }

      for (const meteor of meteors) {
        meteor.x += DIR_X * meteor.speed * dt;
        meteor.y += DIR_Y * meteor.speed * dt;
      }

      // Drop the ones whose tail has fully left the frame.
      meteors = meteors.filter(
        (meteor) =>
          meteor.y - DIR_Y * meteor.length < height &&
          meteor.x - DIR_X * meteor.length > -meteor.length
      );

      drawFrame();
      rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (prefersReducedMotion || rafId !== null || !isOnScreen || width === 0) return;
      lastTime = null;
      rafId = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (width > 0 && height > 0) {
        if (!seeded) {
          seeded = true;
          meteors = Array.from({ length: 3 }, () => seedMeteor(width, height));
        }
        startLoop();
      }
      drawFrame();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isOnScreen = entry.isIntersecting;
      if (isOnScreen) {
        startLoop();
      } else {
        stopLoop();
      }
    });
    intersectionObserver.observe(canvas);

    resize();
    setIsVisible(true);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`cta-canvas ${isVisible ? 'is-visible' : ''}`}
      aria-hidden="true"
    />
  );
};

export default AbstractShapes;
