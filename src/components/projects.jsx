import PropTypes from 'prop-types';
import Project from './project';
import styles from './projects.module.css';

/**
 * The project list component.
 *
 * Use `projects` prop to pass the project list.
 *
 * @param {Object} props The component props.
 *
 * @param {object[]} props.projects The project list.
 *
 * @param {string} props.projects[].title The project title (required).
 *
 * @param {string} props.projects[].description
 * The project description (required).
 *
 * @param {string} props.projects[].github The project github link.
 *
 * @param {string} props.projects[].deploy The project deploy link.
 *
 * @param {string} props.projects[].download The project download link.
 *
 * @return {JSX.Element} The project list component.
 */
export default function Projects({projects = []}) {
  return (
    <div className={styles.projects}>
      {
        projects.map((project, index) => (
          <Project key={index} project={project} />
        ))
      }
    </div>
  );
}

Projects.propTypes = {
  projects: PropTypes.array,
};
