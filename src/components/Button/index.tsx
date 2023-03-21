import Link, { LinkProps } from 'next/link';
import React from 'react';
import styles from './button.module.css';

type ExtendedLinkProps = Omit<
  LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'
>;
type ExtendedHTMLButtonProps = Omit<
  React.HTMLAttributes<HTMLButtonElement>, 'children'
>;

export type ButtonProps<
  Href extends string | undefined = undefined,
> = (Href extends undefined
  ? ExtendedHTMLButtonProps : ExtendedLinkProps
) & {
  /**
   * The Font Awesome icon name.
   */
  faIcon?: string;
  /**
   * The link to go to. If this prop is set, the button will be a link.
   */
  href?: Href;
  /**
   * Whether to hide the button text.
   */
  iconOnly?: boolean;
  /**
   * Whether to hide the button text on mobile size.
   */
  iconOnlyOnMobile?: boolean;
  /**
   * The button name (required). This will be used as the button text.
   * If the `iconOnly` prop is true, this will be used as the button title.
   */
  name: string;
  /**
   * The button variant.
   * @default 'light'.
   */
  variant?: 'primary' | 'primary-outline' | 'light' | 'light-outline';
};

/**
 * The button component that can be used as a link.
 *
 * You can pass any **other props** to the button element. For example, `target`
 * and `rel` props to make the button open a link in a new tab.
 */
export default function Button<
  Href extends string | undefined = undefined,
>({
  faIcon,
  href,
  name,
  iconOnly,
  iconOnlyOnMobile,
  variant = 'light',
  ...others
}: ButtonProps<Href>) {
  const className = `
    ${styles.btn}
    ${variant !== 'light' ? styles[variant] : ''}
    ${iconOnlyOnMobile ? styles['icon-only'] : ''}
  `;
  const title = iconOnly ? name : undefined;

  const content = (
    <>
      {faIcon && <i className={faIcon} />}
      {name && !iconOnly && <span>{name}</span>}
    </>
  );

  return href ? (
    <Link
      href={href}
      className={className}
      title={title}
      {...others as ExtendedLinkProps}
    >
      {content}
    </Link>
  ) : (
    <button
      className={className}
      title={title}
      type="button"
      {...others as ExtendedHTMLButtonProps}
    >
      {content}
    </button>
  );
}

Button.defaultProps = {
  faIcon: undefined,
  href: undefined,
  iconOnly: undefined,
  iconOnlyOnMobile: undefined,
  variant: 'light',
};
