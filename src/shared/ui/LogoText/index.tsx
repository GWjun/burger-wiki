import Image from 'next/image';
import type { ComponentProps } from 'react';

const RATIO = 39 / 11;
const RATIO_BLUR = 47 / 19;

interface LogoTextProps
  extends Omit<
    ComponentProps<typeof Image>,
    'src' | 'alt' | 'width' | 'height'
  > {
  size: number;
  isBlur?: boolean;
}

const LogoText = ({
  isBlur = false,
  size = 30,
  className,
  ...props
}: LogoTextProps) => {
  const imgSrc = isBlur
    ? '/logo/burger-crew-text-blur.svg'
    : '/logo/burger-crew-text.svg';

  return (
    <Image
      src={imgSrc}
      width={isBlur ? RATIO_BLUR * size : RATIO * size}
      height={size}
      className={className}
      alt="버거크루 텍스트"
      priority
      {...props}
    />
  );
};

export default LogoText;
