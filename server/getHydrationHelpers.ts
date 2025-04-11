import 'server-only';

import { cache } from 'react';
import { appRouter, createAsyncCaller } from '@server/routers';
import { makeQueryClient } from '@server/queryClient';
import { createHydrationHelpers } from '@trpc/react-query/rsc';

/**
 * 서버 컴포넌트에서 Tanstack Query API를 사용하여 데이터를 가져올 수 있게 하는 헬퍼함수
 *
 * Dynamic API was called outside request 에러를 피하기 위해
 * RSC 에서 caller 를 생성하고 전달하는 방식으로 구성
 */
export async function getHydrationHelpers() {
  const caller = await createAsyncCaller();

  const getQueryClient = cache(makeQueryClient);

  return createHydrationHelpers<typeof appRouter>(caller, getQueryClient);
}
