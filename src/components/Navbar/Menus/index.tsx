import NavbarMenu, { NavbarMenuProps } from '@/components/Navbar/Menu';
import NavbarContext from '@/components/Navbar/NavbarContext';
import { useContext } from 'react';
import styles from './navbar-menus.module.css';

export type NavbarMenusProps = {
  menus?: NavbarMenuProps[];
}

/**
 * The navbar menus component.
 */
export default function NavbarMenus({ menus = [] }: NavbarMenusProps) {
  const { open } = useContext(NavbarContext);

  return (
    <ul className={`${styles.menus} ${open ? styles.active : ''}`}>
      {menus.map((menu, i) => (
        <NavbarMenu
          key={i}
          {...menu}
        />
      ))}
    </ul>
  );
}
