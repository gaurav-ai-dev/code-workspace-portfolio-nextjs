import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenis = (containerSelector?: string) => {
  useEffect(() => {
    // Wait for DOM to be ready
    const initLenis = () => {
      const wrapper = containerSelector 
        ? document.querySelector(containerSelector) as HTMLElement
        : document.documentElement;
      
      if (!wrapper) return;

      const lenis = new Lenis({
        wrapper: containerSelector ? wrapper : window,
        content: containerSelector ? wrapper : document.documentElement,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(initLenis, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [containerSelector]);
};
