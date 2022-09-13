import PropTypes from 'prop-types';
import Project from './project';
import styles from './projects.module.css';

/**
 * The project list component.
 *
 * Use `projects` prop to pass the project list.
 *
 * @return {JSX.Element}
 */
export default function Projects({projects}) {
  return (
    <div className={styles.projects}>
      {
        projects.map((project, index) => (
          <Project key={index} data={project} />
        ))
      }
    </div>
  );
}

Projects.propTypes = {
  projects: PropTypes.array,
};
