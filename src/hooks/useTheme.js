import { useEffect, useState } from 'react';

const readTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

/**
 * The active theme, read straight off the document element.
 *
 * App owns the theme state, but the components that need it to pick an asset
 * sit several levels down and some render on routes App does not pass props to.
 * Watching the attribute keeps them in step without threading the value through
 * every parent in between.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
};
