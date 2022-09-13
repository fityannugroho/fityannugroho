import Link from 'next/link';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import styles from './navbar-menu.module.css';

/**
 * The navbar menu component.
 * @return {JSX.Element}
 */
export default function NavbarMenu({href, text, isParentVisible}) {
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
      <Link href={href}>
        <a tabIndex={isVisible || isParentVisible ? 0 : -1}>{text}</a>
      </Link>
    </li>
  );
}

NavbarMenu.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  isParentVisible: PropTypes.bool,
};
