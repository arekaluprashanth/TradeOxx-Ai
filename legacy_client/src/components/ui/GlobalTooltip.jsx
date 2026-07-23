import { useEffect } from 'react';

export default function GlobalTooltip() {
  useEffect(() => {
    let currentTarget = null;
    let originalTransform = '';

    const handleMouseOver = (e) => {
      const target = e.target ;
      // Find closest button or link
      const interactiveEl = target.closest('button, a, .group, [role="button"]') ;
      
      if (interactiveEl && !interactiveEl.closest('.no-global-hover')) {
        currentTarget = interactiveEl;
        originalTransform = interactiveEl.style.transform || '';
        
        // Add smooth pop-up scale effect globally
        interactiveEl.style.transform = originalTransform ? `${originalTransform} scale(1.05)` : 'scale(1.05)';
        interactiveEl.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.2s ease-out';
      }
    };

    const handleMouseOut = (e) => {
      if (currentTarget) {
        currentTarget.style.transform = originalTransform;
        currentTarget = null;
      }
    };

    // Use capturing phase
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
      if (currentTarget) {
        currentTarget.style.transform = originalTransform;
      }
    };
  }, []);

  return null;
}
