import {useRouter} from 'next/router';
import Navbar from '../components/navbar';
import PageHead from '../components/page-head';
import Parallax from '../components/parallax';
import translation from '../utils/translation';

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
      </main>
    </>
  );
}
