'use client';

import { captureException } from '@sentry/nextjs';
import { type ReactNode, useState, useCallback } from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { httpBatchLink, TRPCClientError } from '@trpc/client';
import superjson from 'superjson';

import { useAuthRedirect } from '#shared/hooks/useAuthRedirect';
import { useToast } from '#shared/hooks/useToast';
import { trpc } from '#shared/lib/utils/trpc';
import { getErrorMessage } from '@error/error';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default function TrpcClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isRedirect, redirectToLogin } = useAuthRedirect();
  const { addToast } = useToast();

  const handleError = useCallback(
    (error: Error) => {
      if (error instanceof TRPCClientError) {
        if (error.data.httpStatus == 401 && isRedirect) {
          redirectToLogin(window.location.pathname);
          return;
        }

        addToast({
          message: getErrorMessage(error.message || error.data.code),
          variant: 'error',
        });
      } else {
        addToast({
          message: getErrorMessage(error.message),
          variant: 'error',
        });
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(error);
      }

      if (process.env.NODE_ENV === 'production') {
        captureException(error);
      }
    },
    [isRedirect, redirectToLogin, addToast],
  );

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            staleTime: 60 * 1000, // for ssr
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
