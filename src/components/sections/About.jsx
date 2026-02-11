import { useCursor } from '../../context/cursor-store.jsx';
import styles from './About.module.css';

export default function About() {
    const { addRequest, removeRequest } = useCursor();

    return (
        <section className={styles.about} data-scroll-section>
            <img src="/assets/cynthia.webp" alt="Cynthia" className={styles.image} />

            <div className={styles.textBlock}>
                <h5>(About me)</h5>
                <p>
                    I'm a product and motion designer who loves creating things that are not just eye candy but also fix life's little hiccups. When I'm not glued to my computer like a robot or scribbling on my iPad, you might catch me leveling up in video games, snapping photos like a wannabe pro, or watching football because football is life. My design philosophy? Keep it snazzy, make it work, and sprinkle in a bit of fun. I'm the designer you want on your team if you want people to exclaim, "I need that in my life!".
                </p>
                <a
                    href="#"
                    className={styles.talkButton}
                    onMouseEnter={() => addRequest('talk-btn', 'LINK')}
                    onMouseLeave={() => removeRequest('talk-btn')}
                >
                    Let's talk
                </a>
            </div>
        </section>
    );
}
