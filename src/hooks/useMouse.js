import { useEffect, useRef } from 'react';

export function useMouse() {
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return mouse;
}
