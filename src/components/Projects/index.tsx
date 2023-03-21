import ProjectItem from '@/components/Projects/Item';
import { Project as TProject } from '@/types/Project';
import styles from './projects.module.css';

export type ProjectsProps = {
  projects: TProject[];
}

/**
 * The project list component.
 *
 * Use `projects` prop to pass the project list.
 */
export default function ProjectList({ projects }: ProjectsProps) {
  return (
    <div className={styles.projects}>
      {projects.map((project) => (
        <ProjectItem key={project.title} project={project} />
      ))}
    </div>
  );
}
