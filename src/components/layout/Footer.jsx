import { useEffect, useState } from 'react';
import { useCursor } from '../../context/cursor-store.jsx';
import styles from './Footer.module.css';

export default function Footer() {
    const [time, setTime] = useState('');
    const { addRequest, removeRequest } = useCursor();

    useEffect(() => {
        // Clock Logic
        const updateTime = () => {
            const now = new Date();
            // ET Timezone (Toronto/NY)
            const options = { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: true };
            const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
            setTime(timeString + ' ET');
        };

        updateTime();
        const interval = setInterval(updateTime, 60000); // Create interval for updating time every minute
        return () => clearInterval(interval);
    }, []);

    const handleEnter = () => addRequest('footer-link', 'LINK');
    const handleLeave = () => removeRequest('footer-link');

    return (
        <footer className={styles.footer} id="footer" data-scroll-section>
            <div className={styles.footerLeft}>
                {['linkedin', 'x/twitter', 'instagram', 'youtube'].map(link => (
                    <a
                        href="#"
                        key={link}
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                    >
                        {link}
                    </a>
                ))}
            </div>
            <div className={styles.footerRight}>
                <h5>&copy; 2025</h5>
                <h5>{time}</h5>
            </div>
        </footer>
    );
}
