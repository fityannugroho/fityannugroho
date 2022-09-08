import {useRouter} from 'next/router';
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
      <PageHead title={t.get('title')}></PageHead>
      {t.get('homePage')}
    </div>
  );
}
