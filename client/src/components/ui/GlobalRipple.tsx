import { useEffect } from 'react';

export default function GlobalRipple() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't create ripple if clicking a button that might have its own effect,
      // or if we just want a universal effect, we can run it everywhere.
      const ripple = document.createElement('div');
      ripple.className = 'global-ripple';
      
      // Calculate position
      const rect = (e.target as HTMLElement).getBoundingClientRect?.();
      const x = e.clientX;
      const y = e.clientY;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      document.body.appendChild(ripple);

      // Clean up the DOM node after animation finishes (500ms)
      setTimeout(() => {
        ripple.remove();
      }, 500);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
