import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from './button';
import styles from './project.module.css';

/**
 * The project component.
 *
 * Use `project` prop to pass the project data (required).
 *
 * You can pass the locale `title` and `description`
 * in the `project.[locale]` object.
 * If the locale is not available, the default locale will be used.
 *
 * @param {Object} props The component props.
 *
 * @param {Object} props.project The project (required).
 *
 * @param {string} props.project.title The project title (required).
 *
 * @param {string} props.project.description The project description (required).
 *
 * @param {string} props.project.github The project github link.
 *
 * @param {string} props.project.deploy The project deploy link.
 *
 * @param {string} props.project.download The project download link.
 *
 * @return {JSX.Element} The project component.
 */
export default function Project({ project }) {
  const { locale } = useRouter();

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
            style="light-outline"
            faIcon="fa-brands fa-github"
            iconOnly={true}
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
        {project.deploy && (
          <Button
            href={project.deploy}
            name="Demo"
            style="light-outline"
            faIcon="fa-solid fa-play"
            iconOnlyOnMobile={true}
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
        {project.download && (
          <Button
            href={project.download}
            name="Download"
            style="light-outline"
            faIcon="fa-solid fa-download"
            iconOnlyOnMobile={true}
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
      </div>
    </div>
  );
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
};
