import PropTypes from 'prop-types';
import styles from './button.module.css';

/**
 * @param {object} props
 * @return {JSX.Element}
 */
export default function Button({name, style, faIcon, type, ...props}) {
  return (
    <button
      className={`
        ${styles.btn}
        ${style !== 'light' ? styles[style] : ''}
      `}
      type={type ?? 'button'}
      {...props}
    >
      {faIcon && <i className={faIcon} />}
      {name && <span>{name}</span>}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string,
  style: PropTypes.string,
  faIcon: PropTypes.string,
  tag: PropTypes.string,
  type: PropTypes.string,
  props: PropTypes.object,
};
