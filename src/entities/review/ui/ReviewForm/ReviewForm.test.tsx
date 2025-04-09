import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { FormDataValues } from '#entities/review/model/ReviewFormData';
import ToastProvider from '#shared/lib/providers/ToastProvider';

import { ReviewForm } from './';

const user = userEvent.setup();

function setup(initialValues?: FormDataValues) {
  const onValid = jest.fn();
  const onInvalid = jest.fn();
  const onClose = jest.fn();
  const submitName = '수정하기';
  render(
    <ToastProvider>
      <ReviewForm
        onValid={onValid}
        onInvalid={onInvalid}
        initialValues={initialValues}
        submitName={submitName}
        onClose={onClose}
        isCloseButton
      />
      ,
    </ToastProvider>,
  );

  async function clickSubmit() {
    await user.click(screen.getByRole('button', { name: submitName }));
  }

  return {
    clickSubmit,
    onValid,
    onInvalid,
    onClose,
  };
}

describe('ReviewForm 렌더링 테스트', () => {
  test('initialValues 를 념겨주면 초기값이 지정되어 렌더링 된다', async () => {
    setup({ comment: '맛있다' });

    const textbox = screen.getByRole('textbox', { name: '리뷰 작성 본문' });
    expect(textbox).toHaveValue('맛있다');
  });

  test('isCloseButton 을 설정하면 최소하기 버튼이 렌더링 되고 클릭 시 onClose 핸들러가 실행된다', async () => {
    const { onClose } = setup();
    const cancelButton = screen.getByRole('button', { name: '취소하기' });
    expect(cancelButton).toBeInTheDocument();

    await user.click(cancelButton);
    expect(onClose).toHaveBeenCalled();
  });
});

describe('ReviewForm 유효성 테스트', () => {
  test('유효하지 않은 내용으로 제출을 시도하면 onInvalid 핸들러가 실행된다', async () => {
    const { clickSubmit, onValid, onInvalid } = setup();
    await clickSubmit();

    expect(onValid).not.toHaveBeenCalled();
    expect(onInvalid).toHaveBeenCalled();
  });

  test('유효한 내용으로 제출을 시도하면 onValid 핸들러가 실행된다', async () => {
    const { clickSubmit, onValid, onInvalid } = setup({
      score: 3,
    });
    await clickSubmit();

    expect(onValid).toHaveBeenCalled();
    expect(onInvalid).not.toHaveBeenCalled();
  });
});
