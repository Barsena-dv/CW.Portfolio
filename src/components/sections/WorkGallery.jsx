import { getProjects } from '../../data';
import ProjectItem from './ProjectItem';
import styles from './WorkGallery.module.css';

export default function WorkGallery() {
    const projects = getProjects();

    return (
        <section className={styles.gallery} data-scroll-section>
            {projects.map((project, index) => (
                <ProjectItem
                    key={project.id}
                    project={project}
                    isLast={index === projects.length - 1}
                />
            ))}
        </section>
    );
}
