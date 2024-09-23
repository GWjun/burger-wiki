import Image from 'next/image';
import type { ComponentProps } from 'react';

const RATIO = 40 / 11;

interface LogoTextProps
  extends Omit<
    ComponentProps<typeof Image>,
    'src' | 'alt' | 'width' | 'height'
  > {
  size: number;
}

const LogoText = ({ size = 30, className, ...props }: LogoTextProps) => {
  return (
    <Image
      src="/logo/burger-wiki-text.svg"
      width={RATIO * size}
      height={size}
      className={className}
      alt="버거위키"
      priority
      {...props}
    />
  );
};

export default LogoText;
