export interface FormData {
  score: number;
  comment: string;
  consumed_at: Date;
  images: string[];
}

export interface FormDataValues {
  score?: number;
  comment?: string;
  consumed_at?: Date;
  images?: string[];
}

export const MAX_IMAGE = 3;
