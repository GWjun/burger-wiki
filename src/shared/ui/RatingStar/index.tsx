'use client';

import { Rating } from 'react-simple-star-rating';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';

interface RatingStarProps extends ComponentPropsWithoutRef<typeof Rating> {}

export default function RatingStar({
  size = 20,
  initialValue = 0,
  className,
  ...props
}: RatingStarProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Rating
      size={size}
      initialValue={initialValue}
      className={className}
      allowFraction
      readonly
      {...props}
    />
  );
}
