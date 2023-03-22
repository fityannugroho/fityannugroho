import Head from 'next/head';
import Script from 'next/script';

export type PageHeadProps = {
  description?: string;
  keywords?: string;
  title?: string;
}

/**
 * The head component.
 */
export default function PageHead({
  description,
  keywords,
  title,
}: PageHeadProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="/f-logo.ico" type="image/x-icon" />
        <title>{title}</title>
      </Head>
      <Script src="https://kit.fontawesome.com/a4efd995d2.js" crossOrigin="anonymous" />
    </>
  );
}

PageHead.defaultProps = {
  description: undefined,
  keywords: undefined,
  title: undefined,
};