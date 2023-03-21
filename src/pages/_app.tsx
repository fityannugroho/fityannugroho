import { AppProps } from 'next/app';
import PropTypes from 'prop-types';
import './styles.css';

/**
 * This default export is required in a new `pages/_app.js` file.
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};
