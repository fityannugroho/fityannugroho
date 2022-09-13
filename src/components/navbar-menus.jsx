import PropTypes from 'prop-types';
import NavbarMenu from './navbar-menu';
import styles from './navbar-menus.module.css';

/**
 * The navbar menus component.
 * @return {JSX.Element}
 */
export default function NavbarMenus({menus, isParentVisible = false}) {
  return (
    <ul className={`${styles.menus} ${isParentVisible ? styles.active : ''}`}>
      {menus.map((menu, i) => (
        <NavbarMenu
          key={i}
          href={menu.href}
          text={menu.text}
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
