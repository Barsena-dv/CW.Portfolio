import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useCursor } from '../../context/cursor-store.jsx';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { addRequest, removeRequest } = useCursor();

    useGSAP(() => {
        gsap.from('#nav', {
            y: -10,
            opacity: 0,
            duration: 1.5,
            ease: 'expo.inOut'
        });
    });

    const handleEnter = () => addRequest('nav-link', 'LINK');
    const handleLeave = () => removeRequest('nav-link');

    return (
        <div id="nav" className={styles.nav}>
            <a href="#" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Cynthia Ugwu</a>
            <h4 onMouseEnter={handleEnter} onMouseLeave={handleLeave}>MENU<span style={{ color: '#A3A3A3' }}>+</span></h4>
        </div>
    );
}
