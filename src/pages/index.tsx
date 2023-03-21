import Button from '@/components/Button';
import Contacts from '@/components/Contacts';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHead from '@/components/PageHead';
import Parallax from '@/components/Parallax';
import ProjectList from '@/components/Projects';
import Wrapper from '@/components/Wrapper';
import projects from '@/data/projects.json';
import { Project as TProject } from '@/types/Project';
import translation from '@/utils/translation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './index.module.css';

/**
 * The main page.
 */
export default function HomePage() {
  const { locale, defaultLocale } = useRouter();
  const t = translation(locale ?? defaultLocale);

  return (
    <>
      <PageHead title={t.get('title')} description={t.get('description')} />
      <Wrapper>
        <header className="header">
          <Navbar />
        </header>
        <main>
          <Parallax />
          <Container id="about" theme="light-to-dark" large={true}>
            <h2>{t.get('navMenu1')}</h2>
            <div className={styles.about}>
              <div className={styles.photo}>
                <Image
                  src="/profile-pic.png"
                  width={120}
                  height={120}
                  alt="Fityan picture"
                  className="rounded-picture"
                />
              </div>
              <p>{t.get('myDescription')}</p>
              <Button
                name={t.get('btnResume')}
                style="primary"
                faIcon="fa-solid fa-file-pdf"
                href="/resume"
              />
            </div>
          </Container>
          <Container id="project" theme="dark" large={true}>
            <h2>{t.get('navMenu2')}</h2>
            <ProjectList projects={projects as unknown as TProject[]} />
          </Container>
          <Container id="contact" theme="dark-to-light" large={true}>
            <h2>{t.get('navMenu3')}</h2>
            <Contacts />
          </Container>
        </main>
        <Footer />
      </Wrapper>
    </>
  );
}
