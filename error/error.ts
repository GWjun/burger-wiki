export const ERROR_MESSAGES = {
  NOT_FOUND: '찾을 수 없습니다.',
  UNAUTHORIZED: '유효하지 않은 권한입니다.',
  VALIDATION_ERROR: '유효성 검사 오류가 발생했습니다.',
  INTERNAL_SERVER_ERROR: '서버 내부에 오류가 발생했습니다.',
  BAD_REQUEST: '잘못된 요청입니다.',
  FORBIDDEN: '잘못된 접근입니다.',
  TIMEOUT: '요청이 시간 초과되었습니다.',
  CONTEXT_NOT_FOUND: '잘못된 참조 입니다.',
} as const;

export type ErrorCode = keyof typeof ERROR_MESSAGES;

export class AppError extends Error {
  public code: ErrorCode;
  public message: string;
  public status?: number;

  constructor(code: ErrorCode, message: string, status?: number) {
    super(ERROR_MESSAGES[code] || '알 수 없는 오류가 발생했습니다.');
    this.code = code;
    this.message = message;
    this.status = status;
    this.name = 'AppError';
  }
}

export function getErrorMessage(code: ErrorCode): string {
  return ERROR_MESSAGES[code] || '알 수 없는 오류가 발생했습니다.';
}
