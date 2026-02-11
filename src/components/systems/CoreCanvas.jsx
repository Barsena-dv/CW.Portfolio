import { ReactLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import ScrollManager from './ScrollManager';

gsap.registerPlugin(ScrollTrigger);

export default function CoreCanvas({ children }) {
    const lenisRef = useRef();

    // PATCH 6: Accessibility Motion Protection
    const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

    useEffect(() => {
        // Sync Lenis with ScrollTrigger
        // This bridge ensures GSAP animations follow the virtual scroll
        function update(time) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    // Configure Lenis
    const lenisOptions = {
        lerp: prefersReducedMotion ? 0 : 0.1, // Disable smoothing on reduced motion
        duration: 1.5,
        smoothTouch: false, // Default to native on touch for stability
        smooth: !prefersReducedMotion,
    };

    return (
        <ReactLenis root ref={lenisRef} options={lenisOptions} autoRaf={false}>
            <ScrollManager />
            {children}
        </ReactLenis>
    );
}
