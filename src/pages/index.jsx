import Image from 'next/image';
import {useRouter} from 'next/router';
import Container from '../components/container';
import Navbar from '../components/navbar';
import PageHead from '../components/page-head';
import Parallax from '../components/parallax';
import translation from '../utils/translation';
import styles from './index.module.css';

/**
 * The main page.
 * @return {JSX.Element}
 */
export default function HomePage() {
  const {locale, defaultLocale} = useRouter();
  const t = translation(locale ?? defaultLocale);

  return (
    <>
      <PageHead title={t.get('title')} description={t.get('description')} />
      <header className='header'>
        <Navbar />
      </header>
      <main>
        <Parallax />
        <Container>
          <h2 id='about'>{t.get('navMenu1')}</h2>
          <div className={styles.about}>
            <div className={styles.photo}>
              <Image
                src='/profile-pic.png'
                width={120}
                height={120}
                alt='Fityan picture'
                className='rounded-picture'
              />
            </div>
            <p>{t.get('myDescription')}</p>
          </div>
        </Container>
      </main>
    </>
  );
}
