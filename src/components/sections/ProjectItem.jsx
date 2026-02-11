import gsap from 'gsap';
import { useRef } from 'react';
import { useCursor } from '../../context/cursor-store.jsx';
import styles from './WorkGallery.module.css';

export default function ProjectItem({ project, isLast }) {
    const itemRef = useRef();
    const imgRef = useRef();
    const { addRequest, removeRequest } = useCursor();
    const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

    // State for rotation calculation
    const rotRef = useRef({ current: 0, diff: 0 });

    const handleMouseEnter = () => {
        addRequest(`project-${project.id}`, 'VIEW', 20); // Higher priority

        // Show Image
        if (!prefersReducedMotion) {
            gsap.to(imgRef.current, {
                opacity: 1,
                ease: 'power3.out',
                duration: 0.5
            });
        }

        // Dynamic Preload High-Res Image (if we had one)
        // const img = new Image(); img.src = project.highResUrl; // Example logic from Plan Patch 7
    };

    const handleMouseLeave = () => {
        removeRequest(`project-${project.id}`);

        // Hide Image
        if (!prefersReducedMotion) {
            gsap.to(imgRef.current, {
                opacity: 0,
                ease: 'power3.out',
                duration: 0.5
            });
        }
    };

    const handleMouseMove = (e) => {
        if (!itemRef.current || !imgRef.current || prefersReducedMotion) return;

        const rect = itemRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Rotation Logic
        const diff = e.clientX - rotRef.current.current;
        rotRef.current.diff = diff;
        rotRef.current.current = e.clientX;

        const rotation = gsap.utils.clamp(-20, 20, diff * 0.8);

        gsap.to(imgRef.current, {
            top: y,
            left: x,
            rotate: rotation,
            ease: 'power3',
            duration: 0.6 // Smooth follow
        });
    };

    return (
        <a
            href={project.link || '#'}
            className={`${styles.item} ${isLast ? styles.itemLast : ''}`}
            ref={itemRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {/* Optimized Image with explicit sizing or object-fit if needed */}
            <img
                ref={imgRef}
                src={project.imageUrl}
                alt={project.title}
                className={styles.floatingImage}
                loading="lazy"
            />

            <h1>{project.title}</h1>

            <div style={{ textAlign: 'right', zIndex: 2 }}>
                <h5 style={{ color: '#a3a3a3', textTransform: 'uppercase' }}>{project.year}</h5>
            </div>
        </a>
    );
}
