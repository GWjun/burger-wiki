import { trpc } from '#shared/lib/utils/trpc';

const mockBrandData = ['롯데리아', '버거킹'];

export function mockGetAllBrandsName(status = 200) {
  const mockedUseQuery = trpc.brand.getAllBrandsName.useQuery as jest.Mock;
  const mockedUseSuspenseQuery = trpc.brand.getAllBrandsName
    .useSuspenseQuery as jest.Mock;

  if (status > 299) {
    // Mock error for useQuery
    mockedUseQuery.mockReturnValue({
      data: null,
      status: 'error',
      error: new Error('Mock Error'),
      isError: true,
      isSuccess: false,
      isPending: false,
    });
    // Mock error throw for useSuspenseQuery
    mockedUseSuspenseQuery.mockImplementation(() => {
      throw new Error('Mock Error');
    });
  } else if (status === 202) {
    // Mock pending for useQuery
    mockedUseQuery.mockReturnValue({
      data: null,
      status: 'pending',
      error: null,
      isError: false,
      isSuccess: false,
      isPending: true,
    });
    // Mock suspend for useSuspenseQuery
    mockedUseSuspenseQuery.mockImplementation(() => {
      // Throwing a promise is the canonical way to suspend
      throw new Promise(() => {});
    });
  } else {
    // Mock success for useQuery
    mockedUseQuery.mockReturnValue({
      data: mockBrandData,
      status: 'success',
      error: null,
      isError: false,
      isSuccess: true,
      isPending: false,
    });
    // Mock success for useSuspenseQuery (returns data directly)
    mockedUseSuspenseQuery.mockReturnValue([mockBrandData, {}]); // useSuspenseQuery returns [data, queryResult]
  }
}
