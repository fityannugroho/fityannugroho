import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './button.module.css';

/**
 * The button component that can be used as a link.
 *
 * Use `href` prop to make it a link button.
 *
 * Use `style` prop to determine the button style.
 *
 * Use `faIcon` prop to add an icon from Font Awesome.
 *
 * Use `iconOnly` prop to hide the button text.
 *
 * You can pass any **other props** to the button element. For example, `target`
 * and `rel` props to make the button open a link in a new tab.
 *
 * @param {object} props The component props.
 *
 * @param {string} props.name The button name (required). This will be used as
 * the button text. If the `iconOnly` prop is true, this will be used as
 * the button title.
 *
 * @param {string} props.style The button style. The default is 'light'.
 * Available styles are:
 * - `primary`: A primary button.
 * - `primary-outline`: A primary button with outline.
 * - `light`: A light button.
 * - `light-outline`: A light button with outline.
 *
 * @param {string} props.faIcon The Font Awesome icon name.
 *
 * @param {boolean} props.iconOnly Whether to hide the button text.
 *
 * @param {boolean} props.iconOnlyOnMobile Whether to hide the button text
 * on mobile.
 *
 * @param {string} props.href The link to go to. If this prop is set,
 * the button will be a link.
 *
 * @return {JSX.Element} The button component.
 */
export default function Button({
  name,
  style,
  faIcon,
  iconOnly,
  iconOnlyOnMobile,
  href,
  ...others
}) {
  const mainProps = {
    className: `
      ${styles.btn}
      ${style !== 'light' ? styles[style] : ''}
      ${iconOnlyOnMobile ? styles['icon-only'] : ''}
    `,
    ...(iconOnly ? {title: name} : {}),
  };

  const content = (
    <>
      {faIcon && <i className={faIcon} />}
      {name && !iconOnly && <span>{name}</span>}
    </>
  );

  const button = href
  ? (
    <Link href={href} {...mainProps} {...others}>
      {content}
    </Link>
  )
  : (
    <button {...mainProps} {...others}>
      {content}
    </button>
  );

  return button;
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.string,
  faIcon: PropTypes.string,
  iconOnly: PropTypes.bool,
  iconOnlyOnMobile: PropTypes.bool,
  href: PropTypes.string,
};
