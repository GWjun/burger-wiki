import Image from 'next/image';
import type { ComponentProps } from 'react';

interface LogoIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    'src' | 'alt' | 'width' | 'height'
  > {
  size: number;
}

const LogoIcon = ({ size = 30, className, ...props }: LogoIconProps) => {
  return (
    <Image
      src="/logo/burger-crew-icon.svg"
      width={size}
      height={size}
      className={className}
      alt="버거크루 로고 아이콘"
      priority
      {...props}
    />
  );
};

export default LogoIcon;
