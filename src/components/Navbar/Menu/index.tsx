import NavbarContext from '@/components/Navbar/NavbarContext';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import styles from './navbar-menu.module.css';

export type NavbarMenuProps = {
  label: string;
  href: string;
};

/**
 * The navbar menu component.
 */
export default function NavbarMenu({ label, href }: NavbarMenuProps) {
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
