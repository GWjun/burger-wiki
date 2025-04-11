import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { selectImageFile } from '@tests/jest';
import { mockUploadImage } from '../../../../../__mock__/jest';

import { FormProvider, useForm } from 'react-hook-form';
import ToastProvider from '#shared/lib/providers/ToastProvider';

import { ImageElement } from './';

const user = userEvent.setup();

function TestComponent({ initialImages }: { initialImages?: string[] }) {
  const methods = useForm();

  return (
    <ToastProvider>
      <FormProvider {...methods}>
        <ImageElement initialImages={initialImages} />
      </FormProvider>
    </ToastProvider>
  );
}

beforeEach(() => {
  global.URL.revokeObjectURL = jest.fn();
});

describe('ImageUploader 테스트', () => {
  test('이미지 업로드에 성공하면 이미지가 렌더링 된다', async () => {
    mockUploadImage();

    render(<TestComponent />);

    const { selectImage } = selectImageFile();
    await selectImage();

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('이미지 업로드에 실해하면 실패 토스트가 렌더링 된다', async () => {
    mockUploadImage(500);

    render(<TestComponent />);

    const { selectImage } = selectImageFile();
    await selectImage();

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('initialImages 을 념겨주면 이미지가 렌더링 된다', async () => {
    render(<TestComponent initialImages={['/temp/hello.png']} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('삭제 버튼을 클릭하면 이미지가 제거 된다', async () => {
    render(<TestComponent initialImages={['/temp/hello.png']} />);

    const xButton = screen.getByRole('button', { name: '이미지 삭제 버튼' });
    await user.click(xButton);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
