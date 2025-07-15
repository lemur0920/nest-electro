import { HttpException } from "@nestjs/common";

export const EXCEPTION_STATUS = {
  // AUTH
  AUTH: {
    INVALID_TOKEN: {
      errorCode: 10001,
      message: '유효하지 않은 토큰입니다..',
      statusCode: 401,  
    },
    TOKEN_EXPIRED: {
      errorCode: 10002,
      message: '토큰이 만료되었습니다.',
      statusCode: 401,
    },
    INVALID_CREDENTIALS: {
      errorCode: 10003,
      message: '이메일 또는 비밀번호가 잘못되었습니다.',
      statusCode: 401
    },
    UNAUTHENTICATED: {
      errorCode: 10004,
      message: '로그인이 필요합니다.',
      statusCode: 401
    },
    SESSION_TOKEN_MISSING_ERROR: {
      errorCode: 10005,
      message: '회원 ID 또는 세션 토큰이 필요합니다.',
      statusCode: 401
    }
  },
  USER: {
    NOT_FOUND: {
      errorCode: 20001,
      message: '해당 유저가 존재하지 않습니다.',
      statusCode: 404,
    },
    EMAIL_CONFLICT: {
      errorCode: 20002,
      message: '이미 존재하는 유저입니다.',
      statusCode: 409,
    },
    INVALID_PASSWORD: {
      errorCode: 20003,
      message: '비밀번호를 확인해주세요.',
      statusCode: 400
    },
  },
  PRODUCT: {
    NOT_FOUND: {
      errorCode: 30001,
      message: '해당 제품이 존재하지 않습니다.',
      statusCode: 404
    }
  },
  CART: {
    NOT_FOUND: {
      errorCode: 40001,
      message: '장바구니가 존재하지 않습니다.',
      statusCode: 404
    }
  },
  REVIEW: {
    NOT_FOUND: {
      errorCode: 50001,
      message: '리뷰가 존재하지 않습니다.',
      statusCode: 404
    }
  }

}

export class CustomException extends HttpException {
  constructor(exception: { errorCode: number, message: string, statusCode: number }) {
    super({ errorCode: exception.errorCode, message: exception.message }, exception.statusCode);
  }
}