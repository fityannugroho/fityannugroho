import styles from './container.module.css';

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * The children.
   */
  children?: React.ReactNode;
  /**
   * The theme of the container.
   *
   * @default 'none'
   */
  theme?: 'none' | 'white' | 'light' | 'dark' | 'light-to-dark'
    | 'dark-to-light';
  /**
   * Whether to use large container.
   */
  large?: boolean;
  /**
   * Whether to use fullpage container.
   */
  fullpage?: boolean;
}

/**
 * The container component.
 */
export default function Container({
  children,
  theme = 'none',
  large,
  fullpage,
  ...others
}: ContainerProps) {
  return (
    <div
      className={`
        ${styles.container}
        ${theme !== 'none' ? styles[theme] : ''}
        ${large ? styles.large : ''}
        ${fullpage ? styles.fullpage : ''}
      `}
      {...others}
    >
      {children}
    </div>
  );
}
