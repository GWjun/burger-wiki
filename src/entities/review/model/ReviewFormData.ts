export interface FormData {
  score: number;
  comment: string;
  consumed_at: Date;
  images: FileList;
}

export const MAX_IMAGE = 3;
