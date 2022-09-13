import Head from 'next/head';
import Script from 'next/script';
import PropTypes from 'prop-types';

/**
 * The head component.
 * @param {Object} props The props.
 * @return {JSX.Element}
 */
export default function PageHead({
  title = '',
  description = '',
  keywords = '',
}) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <link rel='shortcut icon' href='/f-logo.ico' type='image/x-icon' />
        <title>{title}</title>
      </Head>
      <Script src='https://kit.fontawesome.com/a4efd995d2.js' crossOrigin='anonymous' />
    </>
  );
}

PageHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
};
