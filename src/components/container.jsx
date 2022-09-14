import PropTypes from 'prop-types';
import styles from './container.module.css';

/**
 * The container component.
 *
 * You can pass any **other props** to the container element.
 *
 * @param {object} props The component props.
 *
 * @param {JSX.Element} props.children The component children.
 *
 * @param {string} props.theme The theme of the container.
 * Available themes are:
 * - `none`: No theme.
 * - `white`: White background.
 * - `light`: Light background.
 * - `dark`: Dark background.
 * - `light-to-dark`: Gradient from light to dark.
 * - `dark-to-light`: Gradient from dark to light.
 * Default: `none`.
 *
 * @param {boolean} props.large Whether to use large container.
 * Default: `false`.
 *
 * @param {boolean} props.fullpage Whether to use fullpage container.
 *
 * @return {JSX.Element} The container component.
 */
export default function Container({
  children,
  theme,
  large,
  fullpage,
  ...others
}) {
  return (
    <div
      className={`
        ${styles.container}
        ${theme !== 'none' ? styles[theme] : ''}
        ${large ? styles.large : ''}
        ${fullpage ? styles.fullpage : ''}
      `}
      {...others}
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string,
  large: PropTypes.bool,
  fullpage: PropTypes.bool,
};
