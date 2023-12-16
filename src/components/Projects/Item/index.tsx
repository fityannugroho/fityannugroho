import { useRouter } from 'next/router';
import Button from '@/components/Button';
import { Project as TProject } from '@/types/Project';
import styles from './project.module.css';

export interface ProjectProps {
  /**
   * The project data.
   */
  project: TProject;
}

/**
 * The project component.
 *
 * Use `project` prop to pass the project data (required).
 *
 * You can pass the locale `title` and `description` in the `project.[locale]` object.
 * If the locale is not available, the default locale will be used.
 */
export default function ProjectItem({ project }: ProjectProps) {
  const { defaultLocale, locale = defaultLocale ?? 'en' } = useRouter();

  return (
    <div className={styles.project}>
      <h3 className={styles.title}>
        {project[locale]?.title ?? project.title}
      </h3>
      <p>{project[locale]?.description ?? project.description}</p>
      <div className={styles.buttons}>
        {project.github && (
          <Button
            href={`https://github.com/${project.github}`}
            name="GitHub"
            variant="light-outline"
            faIcon="fa-brands fa-github"
            iconOnly
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
        {project.link && (
          <Button
            href={project.link}
            name="Link"
            variant="light-outline"
            faIcon="fa-solid fa-arrow-up-right-from-square"
            iconOnlyOnMobile
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
        {project.download && (
          <Button
            href={project.download}
            name="Download"
            variant="light-outline"
            faIcon="fa-solid fa-download"
            iconOnlyOnMobile
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
      </div>
    </div>
  );
}
