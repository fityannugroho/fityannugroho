import useTranslation from '@/utils/hooks/useTranslation';
import styles from './parallax.module.css';

/**
 * The parallax component.
 */
export default function Parallax() {
  const { translate } = useTranslation();

  return (
    <div className={styles.parallax}>
      <div className={styles.inner}>
        <h1>{translate('parallaxTitle')}</h1>
        <h2>{translate('parallaxSubtitle')}</h2>
      </div>
    </div>
  );
}
