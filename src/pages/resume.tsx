import PageHead from '@/components/PageHead';
import useTranslation from '@/utils/hooks/useTranslation';
import React from 'react';

/**
 * Endpoint to resume file.
 */
export default function ResumePage() {
  const { translate } = useTranslation();

  React.useEffect(() => {
    window.location.replace(translate('resumeLink'));
  });

  return (
    <PageHead
      title={translate('resumeTitle')}
      description={translate('resumeDescription')}
      keywords={`resume, fityan, fityannugroho, Fityandhiya Islam Nugroho,
        software engineer, web engineer, back-end engineer, portfolio,
      `}
    />
  );
}
