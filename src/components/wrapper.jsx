import PropTypes from 'prop-types';
import styles from './wrapper.module.css';

/**
 * This is a wrapper component that will be used to wrap the
 * entire page and provide a consistent layout.
 *
 * This component will be prevent the page from being scrolled horizontally.
 *
 * @param {object} props The component props.
 * @param {JSX.Element} props.children The children of the component.
 * @return {JSX.Element} The wrapper component.
 */
export default function Wrapper({ children }) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node,
};
