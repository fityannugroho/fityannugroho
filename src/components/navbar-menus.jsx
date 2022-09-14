import PropTypes from 'prop-types';
import NavbarMenu from './navbar-menu';
import styles from './navbar-menus.module.css';

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
 * @param {boolean} props.isParentVisible Whether the parent element is visible.
 * Default is false.
 *
 * @return {JSX.Element} The navbar menus component.
 */
export default function NavbarMenus({menus = [], isParentVisible = false}) {
  return (
    <ul className={`${styles.menus} ${isParentVisible ? styles.active : ''}`}>
      {menus.map((menu, i) => (
        <NavbarMenu
          key={i}
          label={menu.label}
          href={menu.href}
          isParentVisible={isParentVisible}
        />
      ))}
    </ul>
  );
}

NavbarMenus.propTypes = {
  menus: PropTypes.array,
  isParentVisible: PropTypes.bool,
};
