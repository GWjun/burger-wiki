import '@testing-library/jest-dom';

jest.mock('#shared/lib/utils/trpc', () => ({
  trpc: {
    brand: {
      getAllBrandsName: {
        useQuery: jest.fn(),
      },
    },
  },
}));
