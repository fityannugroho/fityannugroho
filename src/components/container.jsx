import PropTypes from 'prop-types';
import styles from './container.module.css';

/**
 * The container component.
 *
 * Available themes: ['light', 'dark', 'light-to-dark', 'dark-to-light'].
 * Default: 'light'.
 *
 * @return {JSX.Element}
 */
export default function Container({
  children,
  theme,
  fullpage,
  className,
  ...props
}) {
  return (
    <div
      className={`
        ${styles.container}
        ${theme !== 'light' ? styles[theme] : ''}
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
  theme: PropTypes.string,
  fullpage: PropTypes.bool,
  className: PropTypes.string,
  props: PropTypes.object,
};
