import { z } from 'zod';

export const reviewFormSchema = z.object({
  score: z
    .number()
    .min(0.5, '별점은 최소 0.5점입니다')
    .max(5, '별점은 최대 5점입니다'),
  comment: z.string().optional(),
  consumed_at: z.date(),
  images: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => !files || files.length <= 3,
      '이미지는 최대 3장까지 업로드할 수 있습니다',
    ),
});
