import PageHead from '@/components/PageHead';
import useTranslation from '@/utils/hooks/useTranslation';
import React from 'react';

/**
 * Endpoint to resume file.
 */
export default function ResumePage() {
  const { locale, translate } = useTranslation();

  const pageTitle = locale === 'id'
    ? 'Resume Fityandhiya Islam Nugroho'
    : 'Fityandhiya Islam Nugroho\'s Resume';

  React.useEffect(() => {
    window.location.replace(translate('resumeLink'));
  });

  return (
    <PageHead
      title={pageTitle}
      description={`${locale === 'id' ? 'Baca' : 'Read'} ${pageTitle}`}
      keywords={`resume, fityan, fityannugroho, Fityandhiya Islam Nugroho,
        software engineer, web engineer, back-end engineer, portfolio,
      `}
    />
  );
}
