import {
  isServer,
  QueryClient,
  MutationCache,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query';

type ErrorHandler = (error: Error) => void;

export function makeQueryClient(onError?: ErrorHandler) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 60 * 1000, // for ssr adaption
        structuralSharing: false,
        throwOnError: true,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
    mutationCache: new MutationCache({
      onError,
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient(onError?: ErrorHandler) {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient(onError);
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient(onError);
    return browserQueryClient;
  }
}
