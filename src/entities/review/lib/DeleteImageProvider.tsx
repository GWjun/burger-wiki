'use client';

import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface DeleteImageContextType {
  deleteImageUrls: string[];
  setDeleteImageUrls: Dispatch<SetStateAction<string[]>>;
}

export const DeleteImageContext = createContext<
  DeleteImageContextType | undefined
>(undefined);

interface DeleteImageProviderProps {
  children: ReactNode;
}

export function DeleteImageProvider({ children }: DeleteImageProviderProps) {
  const [deleteImageUrls, setDeleteImageUrls] = useState<string[]>([]);

  return (
    <DeleteImageContext.Provider
      value={{ deleteImageUrls, setDeleteImageUrls }}
    >
      {children}
    </DeleteImageContext.Provider>
  );
}
