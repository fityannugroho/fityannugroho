import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import translation from '../utils/translation';
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

  return (
    <nav className={`${styles.navbar} ${isTransparent ? styles.transparent : ''}`}>
      <div className={styles.logo}>
        <Image src='/f-logo.ico' alt='Fit Logo' height='24' width='24' />
        <Link href='/'>fityannugroho</Link>
      </div>
      <ul className={`${styles.menus} ${isActive ? styles.active : '' }`}>
        <li className={styles.menu}><Link href='#skills'>{t.get('navMenu1')}</Link></li>
        <li className={styles.menu}><Link href='#project'>{t.get('navMenu2')}</Link></li>
        <li className={styles.menu}><Link href='#contact'>{t.get('navMenu3')}</Link></li>
      </ul>
      <div id='toggleMenu' className={`${styles.toggle} ${isActive ? styles.cross : ''}`} onClick={() => setActive(!isActive)}>
        <span className={styles.line1}></span>
        <span className={styles.line2}></span>
        <span className={styles.line3}></span>
      </div>
    </nav>
  );
}
