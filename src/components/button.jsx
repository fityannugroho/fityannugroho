import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './button.module.css';

/**
 * The button component that can be used as a link.
 *
 * Use `href` prop to make it a link button.
 * The `nextProps` prop is used to pass props to the Next.js Link component.
 *
 * Use `style` prop to determine the button style.
 * ('primary', 'primary-outline', 'light', 'light-outline').
 * The default is 'light'.
 *
 * Use `faIcon` prop to add an icon from Font Awesome.
 *
 * Use `iconOnly` prop to hide the button text.
 *
 * @param {object} props
 * @return {JSX.Element}
 * @see https://nextjs.org/docs/api-reference/next/link for `nextProps` prop
 */
export default function Button({
  name,
  style,
  faIcon,
  iconOnly,
  iconOnlyOnMobile,
  href,
  nextProps,
  ...props
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
    <Link href={href} {...nextProps}>
      <a {...mainProps} {...props}>
        {content}
      </a>
    </Link>
  )
  : (
    <button {...mainProps} {...props}>
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
  nextProps: PropTypes.object,
  props: PropTypes.object,
};
