import { useCursor } from '../../context/cursor-store.jsx';
import styles from './ArrowLink.module.css';

export default function ArrowLink({ href, children }) {
    const { addRequest, removeRequest } = useCursor();

    return (
        <a
            href={href}
            className={styles.link}
            onMouseEnter={() => addRequest('arrow-link', 'LINK')}
            onMouseLeave={() => removeRequest('arrow-link')}
        >
            {children} &nbsp;
            <span className={styles.iconWrapper}>
                <img src="/assets/arrow-right-up-line.svg" alt="arrow" className={styles.icon} />
            </span>
        </a>
    );
}
