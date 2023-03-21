import { useRouter } from 'next/router';
import translation from '../utils/translation';
import styles from './parallax.module.css';

/**
 * The parallax component.
 * @return {JSX.Element}
 */
export default function Parallax() {
  const { locale, defaultLocale } = useRouter();
  const t = translation(locale ?? defaultLocale);

  return (
    <div className={styles.parallax}>
      <div className={styles.inner}>
        <h1>{t.get('parallaxTitle')}</h1>
        <h2>{t.get('parallaxSubtitle')}</h2>
      </div>
    </div>
  );
}
