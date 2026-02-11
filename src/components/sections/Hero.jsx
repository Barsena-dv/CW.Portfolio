import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { useCursor } from '../../context/cursor-store.jsx';
import styles from './Hero.module.css';

export default function Hero() {
    const container = useRef();
    const { addRequest, removeRequest } = useCursor();

    // Intro Animation
    useGSAP(() => {
        const tl = gsap.timeline();

        // Adjusted Timing to match independent Navbar (starts at 0)
        tl.to(`.${styles.boundingelem}`, {
            y: 0,
            ease: 'expo.inOut',
            duration: 2,
            stagger: 0.2,
            delay: 0.5 // Wait 0.5s to start (previously started after Nav's 1.5s - 1s overlap? No, standard orchestration)
        })
            .to(`.${styles.boundingelem2}`, {
                y: 0,
                ease: 'expo.inOut',
                duration: 2,
                stagger: 0.2,
                delay: -1.5
            })
            .from(`.${styles.herofooter}`, {
                y: 10,
                opacity: 0,
                duration: 1.5,
                ease: 'expo.inOut',
                delay: -1
            });

    }, { scope: container });

    const handleEnter = () => addRequest('hero-link', 'LINK');
    const handleLeave = () => removeRequest('hero-link');

    return (
        <div className={styles.hero} ref={container} id="hero">
            <div className={styles.heading}>
                <div className={styles.bounding}>
                    <h1 className={styles.boundingelem}>PRODUCT</h1>
                </div>
                <div className={styles.blocktext}>
                    <div className={styles.bounding}>
                        <h1 className={`${styles.boundingelem} ${styles.secondh1}`}>DESIGNER</h1>
                    </div>
                    <div className={styles.bounding}>
                        <h5 className={styles.boundingelem}>based in toronto</h5>
                    </div>
                </div>
            </div>

            <div className={styles.secondheadings}>
                <div className={styles.bounding}>
                    <h5 className={styles.boundingelem2}>available for full time & freelance</h5>
                </div>
                <div className={styles.bounding}>
                    <h5 className={styles.boundingelem2}>work from sep'24</h5>
                </div>
            </div>

            <div className={styles.herofooter}>
                <a href="#" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                    Previously worked at &nbsp; <span>↗</span> <br />Code and Theory
                </a>
                <a href="#" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                    Protopie ambassador &nbsp; <span>↗</span>
                </a>
                <div className={styles.iconset}>
                    <div className={styles.circle}>↓</div>
                    <div className={styles.circle}>↓</div>
                </div>
            </div>
        </div>
    );
}
