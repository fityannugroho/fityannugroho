import PropTypes from 'prop-types';
import './styles.css';

/**
 * This default export is required in a new `pages/_app.js` file.
 * @param {object} props
 * @return {JSX.Element}
 */
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};
