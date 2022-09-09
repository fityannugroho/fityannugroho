import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import translation from '../utils/translation';
import NavbarMenu from './navbar-menu';
import styles from './navbar.module.css';

/**
 * The navbar component.
 * @return {JSX.Element}
 */
export default function Navbar() {
  const {locale, defaultLocale} = useRouter();
  const t = translation(locale ?? defaultLocale);

  // The state of the navbar on mobile view.
  const [isActive, setActive] = useState(false);
  const [isTransparent, setTransparent] = useState(true);

  useEffect(() => {
    const setNavbarBackground = () => {
      const NAVBAR_HEIGHT = 60;
      const TABLET_WIDTH_BREAKPOINT = 768;

      setTransparent(
          window.scrollY <= NAVBAR_HEIGHT &&
          window.innerWidth >= TABLET_WIDTH_BREAKPOINT,
      );
    };
    setNavbarBackground();

    window.addEventListener('scroll', setNavbarBackground);
    window.addEventListener('resize', setNavbarBackground);
  }, []);

  const onClickToggleMenu = () => {
    setActive(!isActive);
  };

  const onKeyUpToggleMenu = (event) => {
    if (event.key === 'Enter') {
      setActive(!isActive);
    }
  };

  return (
    <nav className={`${styles.navbar} ${isTransparent ? styles.transparent : ''}`}>
      <div className={styles.logo}>
        <Image src='/f-logo.ico' alt='Fit Logo' height='24' width='24' />
        <Link href='/'>fityannugroho</Link>
      </div>
      <div id='toggleMenu' className={`${styles.toggle} ${isActive ? styles.cross : ''}`} onClick={onClickToggleMenu} onKeyUp={onKeyUpToggleMenu} tabIndex={0}>
        <span className={styles.line1}></span>
        <span className={styles.line2}></span>
        <span className={styles.line3}></span>
      </div>
      <ul className={`${styles.menus} ${isActive ? styles.active : '' }`}>
        <NavbarMenu href='#about' text={t.get('navMenu1')} isParentVisible={isActive} />
        <NavbarMenu href='#project' text={t.get('navMenu2')} isParentVisible={isActive} />
        <NavbarMenu href='#contact' text={t.get('navMenu3')} isParentVisible={isActive} />
      </ul>
    </nav>
  );
}
