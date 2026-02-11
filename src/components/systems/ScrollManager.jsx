import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@studio-freight/react-lenis';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollManager() {
  const lenis = useLenis();

  useEffect(() => {
    // PATCH 1: Post-Font Swap Correction
    const fontTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
      // Force one more refresh after a slight delay to catch late swaps
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, 1000); // 1s wait for fonts

    // Failsafe: Promise.race for document.fonts.ready
    if (document.fonts) {
      document.fonts.ready.then(() => {
        clearTimeout(fontTimeout);
        ScrollTrigger.refresh();
      });
    }

    // PATCH 2: Resize Scroll Lock
    let resizeTimer;
    const handleResizeStart = () => {
      // Phase 1: Suspend
      if (lenis) lenis.stop();
      gsap.ticker.sleep();
    };

    const handleResizeEnd = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Phase 2: Resume
            ScrollTrigger.refresh();
            if (lenis) lenis.start();
            gsap.ticker.wake();
        }, 200);
    };

    window.addEventListener('resize', () => {
        handleResizeStart();
        handleResizeEnd();
    });
    
    // PATCH 3: Visibility Performance Control
    const handleVisibility = () => {
        if (document.hidden) {
            gsap.ticker.lagSmoothing(0);
            if (lenis) lenis.stop();
        } else {
            if (lenis) lenis.start();
            gsap.ticker.lagSmoothing(500, 33);
        }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearTimeout(fontTimeout);
      window.removeEventListener('resize', handleResizeEnd); // Only removing one part logic-wise, simplifying cleanup
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [lenis]);

  return null;
}
