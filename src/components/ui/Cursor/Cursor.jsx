import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useCursor } from '../../../context/cursor-store.jsx';
import { useMouse } from '../../../hooks/useMouse';
import styles from './Cursor.module.css'; // We'll create this module

export default function Cursor() {
    const mouse = useMouse(); // Ref {x,y}
    const { cursorType } = useCursor();
    const circleRef = useRef(null);

    // Animation State
    const pos = useRef({ x: 0, y: 0 }); // Current interpolated position
    const vel = useRef({ x: 0, y: 0 }); // Velocity for skew

    // PATCH 6: Accessibility Motion Protection
    const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
    const isMobile = typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false;

    useEffect(() => {
        if (isMobile) return;

        // Tick Loop
        const ctx = gsap.context(() => {
            gsap.ticker.add((time, deltaTime) => {
                if (!circleRef.current) return;

                const dt = 1.0 - Math.pow(1.0 - 0.15, deltaTime / 16); // Lerp factor adjusted for frame time

                // Interpolate position
                const targetX = mouse.current.x;
                const targetY = mouse.current.y;

                pos.current.x += (targetX - pos.current.x) * dt;
                pos.current.y += (targetY - pos.current.y) * dt;

                // Calculate Velocity for Skew
                const vx = targetX - pos.current.x;
                const vy = targetY - pos.current.y;
                // smoothedVelocity logic from legacy
                // legacy: smoothedVelocity += (velocity - smoothedVelocity) * 0.1

                const velocity = Math.sqrt(vx * vx + vy * vy);
                const angle = Math.atan2(vy, vx) * (180 / Math.PI);

                // Skew / Stretch Logic
                let scaleX = 1;
                let scaleY = 1;

                if (!prefersReducedMotion && velocity > 1 && cursorType === 'DEFAULT') {
                    // Simple stretch based on velocity
                    const factor = Math.min(velocity * 0.005, 0.5);
                    scaleX = 1 + factor;
                    scaleY = 1 - factor;
                }

                // Apply Transform
                // Legacy offset: -6px (width/2)
                // We use center translation in CSS or here. Let's do here.

                gsap.set(circleRef.current, {
                    x: pos.current.x,
                    y: pos.current.y,
                    rotation: angle,
                    scaleX: scaleX,
                    scaleY: scaleY,
                    overwrite: 'auto'
                });
            });
        });

        return () => ctx.revert();
    }, [isMobile, prefersReducedMotion, cursorType]);

    // Handle State Changes (Size, MixBlendMode)
    useEffect(() => {
        if (!circleRef.current || isMobile) return;

        if (cursorType === 'LINK') {
            gsap.to(circleRef.current, {
                width: 20,
                height: 20,
                duration: 0.3,
                ease: 'power2.out',
                backgroundColor: '#ffffff',
                mixBlendMode: 'difference'
            });
            circleRef.current.innerHTML = '';
        } else if (cursorType === 'VIEW') {
            gsap.to(circleRef.current, {
                width: 80,
                height: 80,
                duration: 0.3,
                ease: 'power2.out',
                backgroundColor: '#ffffff', // "View" circle is white with black text
                mixBlendMode: 'normal'
            });
            circleRef.current.innerHTML = '<p style="margin:0; font-size:14px; color:black; font-weight:500;">View</p>';
        } else {
            // Default
            gsap.to(circleRef.current, {
                width: 12,
                height: 12,
                duration: 0.3,
                ease: 'power2.out',
                backgroundColor: '#ffffff',
                mixBlendMode: 'difference'
            });
            circleRef.current.innerHTML = '';
        }
    }, [cursorType, isMobile]);

    if (isMobile) return null;

    return (
        <div
            ref={circleRef}
            className={styles.cursor}
            style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, zIndex: 9999, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transformOrigin: 'center center' }}
        />
    );
}
