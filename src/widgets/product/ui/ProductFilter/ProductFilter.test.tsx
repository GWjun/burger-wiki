import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactElement, Suspense } from 'react';

import { mockGetAllBrandsName } from '@server/routers/brand/__mock__/jest';
import { ProductFilter } from './';
import { useProductFilterStore } from '#entities/product';

const user = userEvent.setup();

beforeEach(() => {
  mockGetAllBrandsName(200);
  useProductFilterStore.setState({
    filters: {
      brands: [],
      pattyTypes: [],
      calories: undefined,
    },
  });
});

// Helper function for rendering with Suspense
const renderWithSuspense = (ui: ReactElement) => {
  return render(<Suspense fallback={<div>Loading...</div>}>{ui}</Suspense>);
};

describe('ProductFilter Component', () => {
  test('데이터를 성공적으로 가져올 시 필터 UI가 정상적으로 렌더링된다', async () => {
    renderWithSuspense(<ProductFilter />);

    expect(await screen.findByText('브랜드')).toBeInTheDocument();
    expect(await screen.findByLabelText('롯데리아')).toBeInTheDocument();
  });

  test('전체 초기화 버튼 클릭 시 필터가 초기화된다', async () => {
    const resetFilterSpy = jest.spyOn(
      useProductFilterStore.getState(),
      'resetFilter',
    );

    useProductFilterStore.setState({
      filters: {
        brands: ['롯데리아'],
        pattyTypes: ['meat'],
        calories: { max: 500 },
      },
    });

    renderWithSuspense(<ProductFilter />);

    expect(await screen.findByText('브랜드')).toBeInTheDocument();

    const resetButton = screen.getByText('전체 초기화');
    await user.click(resetButton);

    expect(resetFilterSpy).toHaveBeenCalled();
    expect(useProductFilterStore.getState().filters).toBeUndefined();
  });

  test('브랜드 체크박스를 클릭하면 brands 배열이 업데이트된다', async () => {
    const handleArrayChangeSpy = jest.spyOn(
      useProductFilterStore.getState(),
      'handleArrayChange',
    );

    renderWithSuspense(<ProductFilter />);

    const brandCheckbox = await screen.findByLabelText('롯데리아');
    await user.click(brandCheckbox);

    expect(handleArrayChangeSpy).toHaveBeenCalledWith('brand', '롯데리아');
    expect(useProductFilterStore.getState().filters?.brands).toContain(
      '롯데리아',
    );
  });

  test('패티 체크박스를 클릭하면 pattyTypes 배열이 업데이트된다', async () => {
    const handleArrayChangeSpy = jest.spyOn(
      useProductFilterStore.getState(),
      'handleArrayChange',
    );

    renderWithSuspense(<ProductFilter />);

    expect(screen.getByText('패티')).toBeInTheDocument();

    const pattyCheckbox = screen.getByLabelText('고기');
    await user.click(pattyCheckbox);

    expect(handleArrayChangeSpy).toHaveBeenCalledWith('patty', 'meat');
    expect(useProductFilterStore.getState().filters?.pattyTypes).toContain(
      'meat',
    );
  });

  test('칼로리 라디오 버튼을 클릭하면 calories 필터가 업데이트된다', async () => {
    const updateFilterSpy = jest.spyOn(
      useProductFilterStore.getState(),
      'updateFilter',
    );

    renderWithSuspense(<ProductFilter />);

    expect(screen.getByText('칼로리')).toBeInTheDocument();

    const calorieRadio = screen.getByLabelText('400 이하');
    await user.click(calorieRadio);

    expect(updateFilterSpy).toHaveBeenCalledWith({
      calories: { max: 400 },
    });

    expect(useProductFilterStore.getState().filters?.calories).toEqual({
      max: 400,
    });
  });
});
