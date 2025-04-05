import { TRPCError } from '@trpc/server';
import { type ErrorCode, type CustomErrorCode } from '@error/error';

interface ExtendedTRPCErrorOptions {
  code: ErrorCode;
  customCode?: CustomErrorCode;
  message?: string;
  cause?: unknown;
}

/**
 * 서버에서 TRPC 에러를 던지는 함수
 */
export function throwTRPCError(options: ExtendedTRPCErrorOptions): never {
  throw new TRPCError({
    code: options.code,
    message: options.customCode ?? options.message,
    cause: options.cause,
  });
}
