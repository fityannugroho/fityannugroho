import PageHead from '@/components/PageHead';
import translation from '@/utils/translation';
import { useRouter } from 'next/router';
import React from 'react';

/**
 * Endpoint to resume file.
 */
export default function ResumePage() {
  const { locale, defaultLocale } = useRouter();
  const t = translation(locale ?? defaultLocale);

  const pageTitle = locale === 'id-ID'
    ? 'Resume Fityandhiya Islam Nugroho'
    : 'Fityandhiya Islam Nugroho\'s Resume';

  React.useEffect(() => {
    window.location.replace(t.get('resumeLink'));
  });

  return (
    <PageHead
      title={pageTitle}
      description={`${locale === 'id-ID' ? 'Baca': 'Read'} ${pageTitle}`}
      keywords={`resume, fityan, fityannugroho, Fityandhiya Islam Nugroho,
        software engineer, web engineer, back-end engineer, portfolio,
      `}
    />
  );
}
