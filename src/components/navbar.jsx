import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import translation from '../utils/translation';
import styles from './navbar.module.css';

/**
 * The navbar component.
 * @return {JSX.Element}
 */
export default function Navbar() {
  const {locale, defaultLocale} = useRouter();
  const t = translation(locale ?? defaultLocale);

  return (
    <nav className={`${styles.navbar} ${styles.transparent}`}>
      <div className={styles.logo}>
        <Image src='/f-logo.ico' alt='Fit Logo' height='24' width='24' />
        <Link href='/'>fityannugroho</Link>
      </div>
      <ul className={styles.menus}>
        <li className={styles.menu}><Link href='#skills'>{t.get('navMenu1')}</Link></li>
        <li className={styles.menu}><Link href='#project'>{t.get('navMenu2')}</Link></li>
        <li className={styles.menu}><Link href='#contact'>{t.get('navMenu3')}</Link></li>
      </ul>
      <div id='toggleMenu' className={styles.toggle}>
        <span className={styles.line1}></span>
        <span className={styles.line2}></span>
        <span className={styles.line3}></span>
      </div>
    </nav>
  );
}
