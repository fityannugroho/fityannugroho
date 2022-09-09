import PropTypes from 'prop-types';
import styles from './container.module.css';

/**
 * The container component.
 * @return {JSX.Element}
 */
export default function Container({
  children,
  darkTheme,
  fullpage,
  className,
  ...props
}) {
  return (
    <div
      className={`
        ${styles.container}
        ${darkTheme ? styles.dark : ''}
        ${fullpage ? styles.fullpage : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
  darkTheme: PropTypes.bool,
  fullpage: PropTypes.bool,
  className: PropTypes.string,
  props: PropTypes.object,
};
