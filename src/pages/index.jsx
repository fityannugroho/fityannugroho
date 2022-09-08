import {useRouter} from 'next/router';
import Navbar from '../components/navbar';
import PageHead from '../components/page-head';
import translation from '../utils/translation';

/**
 * The main page.
 * @return {JSX.Element}
 */
export default function HomePage() {
  const {locale, defaultLocale} = useRouter();
  const t = translation(locale ?? defaultLocale);

  return (
    <div>
      <PageHead title={t.get('title')} description={t.get('description')}></PageHead>
      <header className='header'>
        <Navbar></Navbar>
      </header>
      {t.get('homePage')}
    </div>
  );
}
