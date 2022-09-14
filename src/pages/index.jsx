import Image from 'next/image';
import {useRouter} from 'next/router';
import Contacts from '../components/contacts';
import Container from '../components/container';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import PageHead from '../components/page-head';
import Parallax from '../components/parallax';
import Projects from '../components/projects';
import Wrapper from '../components/wrapper';
import projects from '../data/projects.json';
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
      <Wrapper>
        <header className='header'>
          <Navbar />
        </header>
        <main>
          <Parallax />
          <Container id='about' theme='light-to-dark' large={true}>
            <h2>{t.get('navMenu1')}</h2>
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
          <Container id='project' theme='dark' large={true}>
            <h2>{t.get('navMenu2')}</h2>
            <Projects projects={projects} />
          </Container>
          <Container id='contact' theme='dark-to-light' large={true}>
            <h2>{t.get('navMenu3')}</h2>
            <Contacts />
          </Container>
        </main>
        <Footer />
      </Wrapper>
    </>
  );
}
