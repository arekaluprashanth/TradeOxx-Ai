 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useEffect } from 'react';

export default function GlobalRipple() {
  useEffect(() => {
    const handleClick = (e) => {
      // Don't create ripple if clicking a button that might have its own effect,
      // or if we just want a universal effect, we can run it everywhere.
      const ripple = document.createElement('div');
      ripple.className = 'global-ripple';
      
      // Calculate position
      const rect = _optionalChain([(e.target ), 'access', _ => _.getBoundingClientRect, 'optionalCall', _2 => _2()]);
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
