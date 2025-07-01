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
  },
  USER: {
    NOT_FOUND: {
      errorCode: 10002,
      message: '해당 유저가 존재하지 않습니다.',
      statusCode: 404,
    },
    CONFLICT: {
      errorCode: 10003,
      message: '이미 존재하는 유저입니다.',
      statusCode: 409
    }
  },
}

export class CustomException extends HttpException {
  constructor(exception: { errorCode: number, message: string, statusCode: number }) {
    super({ errorCode: exception.errorCode, message: exception.message }, exception.statusCode);
  }
}