import { useContext } from 'react';
import NavbarMenu, { NavbarMenuProps } from './navbar-menu';
import styles from './navbar-menus.module.css';
import NavbarContext from './Navbar/NavbarContext';

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
