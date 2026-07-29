# Diagrams

Source files for the diagrams used in case studies. Each one is plain HTML,
rendered to WebP with headless Chrome so it can be edited later instead of
being a flat image with no origin.

## design-hub-skills.html

The nine Design System Lite skills and how they hand off to each other. Used in
the Design Hub case study.

Regenerate after editing:

```sh
# Render at 1536px wide, which is 2x the 768px carousel container
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1.038 \
  --screenshot=/tmp/skills.png \
  --window-size=1480,600 \
  "file://$PWD/diagrams/design-hub-skills.html"

cwebp -q 94 -m 6 -sharp_yuv /tmp/skills.png \
  -o public/assets/portfolio/portfolio-designhub-skills.webp
```

Render at the size it will be displayed. A much larger image gets downscaled by
the browser with a fast filter, which softens small text.
