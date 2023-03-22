import NavbarMenus from '@/components/Navbar/Menus';
import NavbarContext from '@/components/Navbar/NavbarContext';
import useTranslation from '@/utils/hooks/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import styles from './navbar.module.css';

/**
 * The navbar component.
 */
export default function Navbar() {
  const { pathname, replace } = useRouter();
  const {
    defaultLocale, locale, locales, translate,
  } = useTranslation();

  // The state of the navbar menus on mobile view.
  const [isOpened, open] = useState(false);

  const onClickToggleMenu = () => {
    open(!isOpened);
  };

  const onKeyUpToggleMenu = (event: React.KeyboardEvent) => {
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
          <div
            id="toggleMenu"
            className={`${styles.toggle} ${isOpened ? styles.cross : ''}`}
            onClick={onClickToggleMenu}
            onKeyUp={onKeyUpToggleMenu}
            role="button"
            tabIndex={0}
          >
            <span className={styles.line1} />
            <span className={styles.line2} />
            <span className={styles.line3} />
          </div>

          <Link href="/" className={`${styles.brand}`}>
            <Image src="/f-logo.ico" alt="Fit Logo" height="24" width="24" />
            <span className={styles['brand-name']}>fityannugroho</span>
          </Link>
        </div>

        <div className={styles.section}>
          <NavbarMenus
            menus={[
              { label: translate('navMenu1'), href: '#about' },
              { label: translate('navMenu2'), href: '#project' },
              { label: translate('navMenu3'), href: '#contact' },
            ]}
          />

          <select
            id="lang"
            className={styles.dropdown}
            defaultValue={locale ?? defaultLocale}
            onInput={(e) => replace(pathname, pathname, {
              locale: e.currentTarget.value,
            })}
          >
            {locales?.map((item) => (
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
