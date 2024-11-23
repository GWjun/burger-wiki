import { trpc } from '#shared/lib/utils/trpc';

export function mockGetAllBrandsName(status = 200) {
  const mockedUseQuery = trpc.brand.getAllBrandsName.useQuery as jest.Mock;

  if (status > 299) {
    return mockedUseQuery.mockReturnValue({
      data: null,
      status: 'error',
    });
  } else if (status === 202) {
    return mockedUseQuery.mockReturnValue({
      data: null,
      status: 'pending',
    });
  }

  return mockedUseQuery.mockReturnValue({
    data: ['롯데리아', '버거킹'],
    status: 'success',
  });
}
