'use client';

import { captureException } from '@sentry/nextjs';
import { ReactNode, useState, useCallback } from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

import { useToast } from '#shared/hooks/useToast';
import { trpc } from '#shared/lib/utils/trpc';
import { getErrorMessage } from '#error/error';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default function TrpcClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { addToast } = useToast();

  const handleError = useCallback(
    (error: Error) => {
      addToast({
        message: getErrorMessage(error.message),
        variant: 'error',
      });

      if (process.env.NODE_ENV === 'production') {
        captureException(error);
      }
    },
    [addToast],
  );

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            structuralSharing: false,
          },
          mutations: {
            retry: 0,
          },
        },
        queryCache: new QueryCache({
          onError: handleError,
        }),
        mutationCache: new MutationCache({
          onError: handleError,
        }),
      }),
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
          async headers() {
            return {};
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
