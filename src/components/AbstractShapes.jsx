import { useEffect, useRef, useState } from 'react';

const SHAPE_TYPES = ['circle', 'ring', 'square', 'triangle', 'plus', 'arc', 'dot'];
const WRAP_MARGIN = 64;

const createShape = (width, height) => {
  const heading = Math.random() * Math.PI * 2;
  const speed = 5 + Math.random() * 12;
  return {
    type: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
    size: 10 + Math.random() * 34,
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(heading) * speed,
    vy: Math.sin(heading) * speed,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.6,
    alpha: 0.06 + Math.random() * 0.1,
    arcStart: Math.random() * Math.PI * 2,
  };
};

const drawShape = (ctx, shape) => {
  const { type, size } = shape;
  const half = size / 2;

  ctx.save();
  ctx.translate(shape.x, shape.y);
  ctx.rotate(shape.rotation);
  ctx.strokeStyle = `rgba(26, 26, 26, ${shape.alpha})`;
  ctx.fillStyle = `rgba(26, 26, 26, ${shape.alpha})`;
  ctx.lineWidth = 1;

  switch (type) {
    case 'circle':
      ctx.beginPath();
      ctx.arc(0, 0, half, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 'ring':
      ctx.beginPath();
      ctx.arc(0, 0, half, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, half * 0.55, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 'square':
      ctx.strokeRect(-half, -half, size, size);
      break;
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(0, -half);
      ctx.lineTo(half * 0.866, half * 0.5);
      ctx.lineTo(-half * 0.866, half * 0.5);
      ctx.closePath();
      ctx.stroke();
      break;
    case 'plus':
      ctx.beginPath();
      ctx.moveTo(-half, 0);
      ctx.lineTo(half, 0);
      ctx.moveTo(0, -half);
      ctx.lineTo(0, half);
      ctx.stroke();
      break;
    case 'arc':
      ctx.beginPath();
      ctx.arc(0, 0, half, shape.arcStart, shape.arcStart + Math.PI * 1.2);
      ctx.stroke();
      break;
    case 'dot':
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(2, half * 0.15), 0, Math.PI * 2);
      ctx.fill();
      break;
  }

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

    let shapes = [];
    let width = 0;
    let height = 0;
    let rafId = null;
    let lastTime = null;
    let isOnScreen = true;

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      for (const shape of shapes) {
        drawShape(ctx, shape);
      }
    };

    const tick = (time) => {
      const dt = Math.min((time - (lastTime ?? time)) / 1000, 0.1);
      lastTime = time;

      for (const shape of shapes) {
        shape.x += shape.vx * dt;
        shape.y += shape.vy * dt;
        shape.rotation += shape.spin * dt;

        if (shape.x < -WRAP_MARGIN) shape.x = width + WRAP_MARGIN;
        if (shape.x > width + WRAP_MARGIN) shape.x = -WRAP_MARGIN;
        if (shape.y < -WRAP_MARGIN) shape.y = height + WRAP_MARGIN;
        if (shape.y > height + WRAP_MARGIN) shape.y = -WRAP_MARGIN;
      }

      drawFrame();
      rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (prefersReducedMotion || rafId !== null || !isOnScreen || shapes.length === 0) return;
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

      if (shapes.length === 0 && width > 0 && height > 0) {
        const count = Math.min(48, Math.max(18, Math.round((width * height) / 18000)));
        shapes = Array.from({ length: count }, () => createShape(width, height));
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
