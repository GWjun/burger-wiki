import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { trpc } from '#shared/lib/utils/trpc';
import { useProductFilter } from '#entities/product';

import { ProductFilter } from './';

jest.mock('#shared/lib/utils/trpc', () => ({
  trpc: {
    brand: {
      getAllBrandsName: {
        useQuery: jest.fn(),
      },
    },
  },
}));

jest.mock('#entities/product', () => ({
  ...jest.requireActual('#entities/product'),
  useProductFilter: jest.fn(),
}));

// to avoid recipe error
jest.mock('./styles.css', () => ({
  buttonVariants: jest.fn(() => 'mocked-class-name'),
}));

const user = userEvent.setup();
const mockedUseProductFilter = useProductFilter as jest.Mock;
const mockedUseQuery = trpc.brand.getAllBrandsName.useQuery as jest.Mock;

beforeEach(() => {
  mockedUseProductFilter.mockReturnValue({
    filters: {
      brands: [],
      pattyTypes: [],
      calories: undefined,
    },
    updateFilter: jest.fn(),
    resetFilter: jest.fn(),
    handleArrayChange: jest.fn(),
  });

  mockedUseQuery.mockReturnValue({
    data: ['롯데리아', '버거킹'],
    status: 'success',
  });
});

describe('ProductFilter Component', () => {
  it('로딩 중일 때 스켈레톤 UI를 표시해야 한다', () => {
    mockedUseQuery.mockReturnValue({
      data: null,
      status: 'pending',
    });

    render(<ProductFilter />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('전체 초기화 버튼 클릭 시 resetFilter가 호출된다', async () => {
    render(<ProductFilter />);

    const resetButton = screen.getByText('전체 초기화');
    await user.click(resetButton);

    expect(mockedUseProductFilter().resetFilter).toHaveBeenCalled();
  });

  it('브랜드 체크박스를 클릭하면 handleArrayChange가 호출된다', async () => {
    render(<ProductFilter />);

    const brandCheckbox = screen.getByLabelText('롯데리아');
    await user.click(brandCheckbox);

    expect(mockedUseProductFilter().handleArrayChange).toHaveBeenCalledWith(
      'brand',
      '롯데리아',
    );
  });

  it('패티 체크박스를 클릭하면 handleArrayChange가 호출된다', async () => {
    render(<ProductFilter />);

    const pattyCheckbox = screen.getByLabelText('고기');
    await user.click(pattyCheckbox);

    expect(mockedUseProductFilter().handleArrayChange).toHaveBeenCalledWith(
      'patty',
      'meat',
    );
  });

  it('칼로리 라디오 버튼을 클릭하면 updateFilter가 호출된다', async () => {
    render(<ProductFilter />);

    const calorieRadio = screen.getByLabelText('400 이하');
    await user.click(calorieRadio);

    expect(mockedUseProductFilter().updateFilter).toHaveBeenCalledWith({
      calories: { max: 400 },
    });
  });
});
