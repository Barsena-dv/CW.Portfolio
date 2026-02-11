import ArrowLink from '../ui/ArrowLink';
import styles from './Subscribe.module.css';

export default function Subscribe() {
    return (
        <section className={styles.subscribe} data-scroll-section>
            <h5>oops, almost forgot...</h5>
            <ArrowLink href="#">
                subscribe to my youtube channel
            </ArrowLink>
        </section>
    );
}
