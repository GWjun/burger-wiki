import { supabase } from '#shared/lib/utils/supabase-client';

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!;

export async function uploadImage(file: File, dir: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${dir}/${fileName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(filePath, file);
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteImage(publicUrl: string) {
  const urlParts = publicUrl.split('/');
  const filePath = urlParts.slice(urlParts.indexOf(BUCKET) + 1).join('/');

  const { error } = await supabase.storage.from(BUCKET).remove([filePath]);
  if (error) throw error;

  return true;
}

export async function moveImage(sourceUrl: string, destinationDir: string) {
  const urlParts = sourceUrl.split('/');
  const sourceFilePath = urlParts.slice(urlParts.indexOf(BUCKET) + 1).join('/');

  const fileName = urlParts[urlParts.length - 1];

  const destinationFilePath = `${destinationDir}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .move(sourceFilePath, destinationFilePath);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(destinationFilePath);

  return publicUrl;
}
