import styles from './wrapper.module.css';

export type WrapperProps = {
  children?: React.ReactNode;
}

/**
 * This is a wrapper component that will be used to wrap the
 * entire page and provide a consistent layout.
 *
 * This component will be prevent the page from being scrolled horizontally.
 */
export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}

Wrapper.defaultProps = {
  children: undefined,
};
