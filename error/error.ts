// trpc 라이브러리에 정의되어 있는 코드
export const ERROR_MESSAGES = {
  BAD_REQUEST: '잘못된 요청입니다.',
  UNAUTHORIZED: '유효하지 않은 권한입니다.',
  FORBIDDEN: '잘못된 접근입니다.',
  NOT_FOUND: '찾을 수 없습니다.',
  TIMEOUT: '요청이 시간 초과되었습니다.',
  INTERNAL_SERVER_ERROR: '서버 내부에 오류가 발생했습니다.',
} as const;

// 커스텀 에러 코드
export const CUSTOM_ERROR_MESSAGES = {
  CONTEXT_NOT_FOUND: '잘못된 참조 입니다.',
  ALREADY_LIKED: '이미 추천한 버거 입니다.',
  ALREADY_DISLIKED: '이미 비추천한 버거 입니다.',
};

export type ErrorCode = keyof typeof ERROR_MESSAGES;
export type CustomErrorCode = keyof typeof CUSTOM_ERROR_MESSAGES;

/**
 * 클라이언트에서 에러 코드에 해당하는 메시지를 반환합니다.
 */
export function getErrorMessage(code: ErrorCode | CustomErrorCode | string) {
  if (code in CUSTOM_ERROR_MESSAGES)
    return CUSTOM_ERROR_MESSAGES[code as CustomErrorCode];
  if (code in ERROR_MESSAGES) return ERROR_MESSAGES[code as ErrorCode];
  return '알 수 없는 오류가 발생했습니다.';
}
