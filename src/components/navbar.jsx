import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useMemo, useState} from 'react';
import translation from '../utils/translation';
import NavbarMenus from './navbar-menus';
import styles from './navbar.module.css';
import NavbarContext from './Navbar/NavbarContext';

/**
 * The navbar component.
 *
 * @return {JSX.Element} The navbar component.
 */
export default function Navbar() {
  const {defaultLocale, locale, locales, pathname, replace} = useRouter();
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

  const navbarContext = useMemo(() => ({
    open: isOpened,
    toggle: () => open(!isOpened),
    setOpen: () => open(true),
    setClose: () => open(false),
  }), [isOpened]);

  return (
    <NavbarContext.Provider value={navbarContext}>
      <nav className={styles.navbar}>
        <div className={styles.section}>
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

          <Link href='/' className={`${styles.brand}`}>
            <Image src='/f-logo.ico' alt='Fit Logo' height='24' width='24' />
            <span className={styles['brand-name']}>fityannugroho</span>
          </Link>
        </div>

        <div className={styles.section}>
          <NavbarMenus
            menus={[
              {label: t.get('navMenu1'), href: '#about'},
              {label: t.get('navMenu2'), href: '#project'},
              {label: t.get('navMenu3'), href: '#contact'},
            ]}
          />

          <select
            id='lang'
            className={styles.dropdown}
            defaultValue={locale ?? defaultLocale}
            onInput={(e) => replace(pathname, pathname, {
              locale: e.target.value,
            })}
          >
            {locales.map((item) => (
              <option key={item} value={item}>
                {item.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </NavbarContext.Provider>
  );
}
