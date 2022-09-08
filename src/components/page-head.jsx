import Head from 'next/head';
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
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <title>{title}</title>
    </Head>
  );
}

PageHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
};
