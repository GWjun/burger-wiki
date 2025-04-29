import * as ImageUpload from '#shared/lib/utils/image-upload';

jest.mock('#shared/lib/utils/image-upload');

export function mockUploadImage(status = 200) {
  if (status > 299) {
    return jest
      .spyOn(ImageUpload, 'uploadImage')
      .mockRejectedValueOnce(new Error('이미지 업로드 오류'));
  }
  return jest
    .spyOn(ImageUpload, 'uploadImage')
    .mockResolvedValueOnce('/temp/hello.png');
}
