import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// input 에 임의의 파일을 설정하는 함수
export function selectImageFile(
  inputTestId = 'file',
  fileName = 'hello.png',
  content = 'hello',
) {
  const user = userEvent.setup();

  const filePath = [`/temp/${fileName}`];
  const file = new File([content], fileName, { type: 'image/png' });

  const fileInput = screen.getByTestId(inputTestId);
  const selectImage = () => user.upload(fileInput, file);

  return { fileInput, filePath, selectImage };
}
