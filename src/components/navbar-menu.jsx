import Link from 'next/link';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import styles from './navbar-menu.module.css';

/**
 * The navbar menu component.
 *
 * @param {object} props The component props.
 *
 * @param {string} props.label The menu label (required).
 *
 * @param {string} props.href The menu link.
 *
 * @param {boolean} props.isParentVisible Whether the parent element is visible.
 *
 * @return {JSX.Element} The navbar menu component.
 */
export default function NavbarMenu({label, href, isParentVisible}) {
  const [isVisible, setVisibility] = useState(true);

  useEffect(() => {
    const setMenuVisibility = () => {
      const TABLET_WIDTH_BREAKPOINT = 768;
      setVisibility(window.innerWidth >= TABLET_WIDTH_BREAKPOINT);
    };
    setMenuVisibility();

    window.addEventListener('resize', setMenuVisibility);
  }, []);

  return (
    <li className={styles.menu}>
      <Link href={href} tabIndex={isVisible || isParentVisible ? 0 : -1}>
        {label}
      </Link>
    </li>
  );
}

NavbarMenu.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  isParentVisible: PropTypes.bool,
};
