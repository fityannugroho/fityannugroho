import PropTypes from 'prop-types';
import { useContext } from 'react';
import NavbarMenu from './navbar-menu';
import styles from './navbar-menus.module.css';
import NavbarContext from './Navbar/NavbarContext';

/**
 * The navbar menus component.
 *
 * @param {object} props The component props.
 *
 * @param {object[]} props.menus The menus.
 *
 * @param {string} props.menus[].label The menu label (required).
 *
 * @param {string} props.menus[].href The menu link.
 *
 * @return {JSX.Element} The navbar menus component.
 */
export default function NavbarMenus({ menus = [] }) {
  const { open } = useContext(NavbarContext);

  return (
    <ul className={`${styles.menus} ${open ? styles.active : ''}`}>
      {menus.map((menu, i) => (
        <NavbarMenu
          key={i}
          label={menu.label}
          href={menu.href}
        />
      ))}
    </ul>
  );
}

NavbarMenus.propTypes = {
  menus: PropTypes.array,
};
