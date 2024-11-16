import { render, screen } from '@testing-library/react';

describe('샘플 테스트', () => {
  test('h1이 존재한다', () => {
    render(<h1>testing</h1>);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
