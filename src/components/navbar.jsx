import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import translation from '../utils/translation';
import NavbarMenus from './navbar-menus';
import styles from './navbar.module.css';

/**
 * The navbar component.
 * @return {JSX.Element}
 */
export default function Navbar() {
  const {locale, defaultLocale} = useRouter();
  const t = translation(locale ?? defaultLocale);

  // The state of the navbar background.
  const [isTransparent, setTransparent] = useState(true);
  // The state of the navbar menus on mobile view.
  const [isOpened, open] = useState(false);

  useEffect(() => {
    const setNavbarBackground = () => {
      const NAVBAR_HEIGHT = 60;
      const TABLET_WIDTH_BREAKPOINT = 768;

      setTransparent(
          window.scrollY <= NAVBAR_HEIGHT
          && window.innerWidth >= TABLET_WIDTH_BREAKPOINT,
      );
    };

    setNavbarBackground();
    window.addEventListener('scroll', setNavbarBackground);
    window.addEventListener('resize', setNavbarBackground);
  }, []);

  const onClickToggleMenu = () => {
    open(!isOpened);
  };

  const onKeyUpToggleMenu = (event) => {
    if (event.key === 'Enter') {
      open(!isOpened);
    }
  };

  return (
    <nav
      className={`${styles.navbar} ${isTransparent ? styles.transparent : ''}`}
    >
      <div className={styles.logo}>
        <Image src='/f-logo.ico' alt='Fit Logo' height='24' width='24' />
        <Link href='/'>fityannugroho</Link>
      </div>

      <div id='toggleMenu'
        className={`${styles.toggle} ${isOpened ? styles.cross : ''}`}
        onClick={onClickToggleMenu}
        onKeyUp={onKeyUpToggleMenu}
        tabIndex={0}
      >
        <span className={styles.line1}></span>
        <span className={styles.line2}></span>
        <span className={styles.line3}></span>
      </div>

      <NavbarMenus
        menus={[
          {href: '#about', text: t.get('navMenu1')},
          {href: '#project', text: t.get('navMenu2')},
          {href: '#contact', text: t.get('navMenu3')},
        ]}
        isParentVisible={isOpened}
      />
    </nav>
  );
}
