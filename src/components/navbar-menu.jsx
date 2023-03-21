import Link from 'next/link';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import styles from './navbar-menu.module.css';
import NavbarContext from './Navbar/NavbarContext';

/**
 * The navbar menu component.
 *
 * @param {object} props The component props.
 *
 * @param {string} props.label The menu label (required).
 *
 * @param {string} props.href The menu link.
 *
 * @return {JSX.Element} The navbar menu component.
 */
export default function NavbarMenu({ label, href }) {
  const { open, setClose } = useContext(NavbarContext);
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
      <Link
        href={href}
        tabIndex={isVisible || open ? 0 : -1}
        onClick={() => setClose()}
      >
        {label}
      </Link>
    </li>
  );
}

NavbarMenu.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
};
