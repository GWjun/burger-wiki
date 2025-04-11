import '@testing-library/jest-dom';

// vanilla-extract 의 recipe error 를 피아기 위함
jest.mock('./styles.css', () => ({
  buttonVariants: jest.fn(() => 'mocked-class-name'),
  toastLineVariants: jest.fn(() => 'mocked-class-name'),
}));

jest.mock('#shared/lib/utils/trpc', () => ({
  trpc: {
    brand: {
      getAllBrandsName: {
        useQuery: jest.fn(),
        useSuspenseQuery: jest.fn(),
      },
    },
  },
}));
