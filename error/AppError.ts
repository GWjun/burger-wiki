import { ErrorCode, CustomErrorCode, getErrorMessage } from '@error/error';

/**
 * 애플리케이션 에러를 위한 커스텀 에러 클래스
 */
export class AppError extends Error {
  public code: ErrorCode | CustomErrorCode | string;
  public message: string;
  public status?: number;

  constructor(
    code: ErrorCode | CustomErrorCode | string,
    message?: string,
    status?: number,
  ) {
    super(getErrorMessage(code));
    this.code = code;
    this.message = message || getErrorMessage(code);
    this.status = status;
    this.name = 'AppError';
  }
}
