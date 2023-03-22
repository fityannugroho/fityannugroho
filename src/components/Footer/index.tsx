import styles from './footer.module.css';

/**
 * The footer component.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>&copy; fityannugroho, 2023</p>
    </footer>
  );
}
