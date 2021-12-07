import clsx from 'clsx';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

export default function CustomLink({
  children,
  className,
  ...rest
}: UnstyledLinkProps) {
  return (
    <UnstyledLink
      {...rest}
      className={clsx(
        'animated-underline custom-link font-semibold inline-flex items-center',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:rounded',
        'border-b border-dark border-dotted hover:border-black/0',
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
}
