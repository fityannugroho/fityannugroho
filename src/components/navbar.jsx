import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import translation from '../utils/translation';
import NavbarMenus from './navbar-menus';
import styles from './navbar.module.css';

/**
 * The navbar component.
 *
 * @return {JSX.Element} The navbar component.
 */
export default function Navbar() {
  const {locale, defaultLocale} = useRouter();
  const t = translation(locale ?? defaultLocale);

  // The state of the navbar menus on mobile view.
  const [isOpened, open] = useState(false);

  const onClickToggleMenu = () => {
    open(!isOpened);
  };

  const onKeyUpToggleMenu = (event) => {
    if (event.key === 'Enter') {
      open(!isOpened);
    }
  };

  return (
    <nav className={styles.navbar}>
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
          {label: t.get('navMenu1'), href: '#about'},
          {label: t.get('navMenu2'), href: '#project'},
          {label: t.get('navMenu3'), href: '#contact'},
        ]}
        isParentVisible={isOpened}
      />
    </nav>
  );
}
