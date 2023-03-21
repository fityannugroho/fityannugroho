import styles from './container.module.css';

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * The children.
   */
  children?: React.ReactNode;
  /**
   * Whether to use fullpage container.
   */
  fullpage?: boolean;
  /**
   * Whether to use large container.
   */
  large?: boolean;
  /**
   * The theme of the container.
   *
   * @default 'none'
   */
  theme?: 'none' | 'white' | 'light' | 'dark' | 'light-to-dark'
    | 'dark-to-light';
}

/**
 * The container component.
 */
export default function Container({
  children,
  fullpage,
  large,
  theme = 'none',
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

Container.defaultProps = {
  children: undefined,
  fullpage: undefined,
  large: undefined,
  theme: 'none',
};
