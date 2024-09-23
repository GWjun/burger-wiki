import { supabase } from '#shared/lib/utils/supabase-client';

export async function uploadImage(
  file: File,
  dir: string,
): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${dir}/${fileName}`;
  const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!;

  const { error } = await supabase.storage.from(BUCKET).upload(filePath, file);
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

  return publicUrl;
}
