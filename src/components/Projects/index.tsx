import { Project as TProject } from '../../types/Project';
import Project from './Item';
import styles from './projects.module.css';

export type ProjectsProps = {
  projects: TProject[];
}

/**
 * The project list component.
 *
 * Use `projects` prop to pass the project list.
 */
export default function Projects({ projects }: ProjectsProps) {
  return (
    <div className={styles.projects}>
      {projects.map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </div>
  );
}
