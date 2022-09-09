import styles from './parallax.module.css';

/**
 * The parallax component.
 * @return {JSX.Element}
 */
export default function Parallax() {
  return (
    <div className={styles.parallax}>
      <div className={styles.inner}>
        <h1>Fityandhiya Islam Nugroho</h1>
        <h2 lang='en'>Software Engineer</h2>
      </div>
    </div>
  );
}
