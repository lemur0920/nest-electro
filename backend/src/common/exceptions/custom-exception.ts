import { HttpException } from "@nestjs/common";

export const EXCEPTION_STATUS = {
  // AUTH
  LOGIN_TOKEN_ERROR: {
    errorCode: 10001,
    message: '올바른 토큰이 아닙니다.',
    statusCode: 401,
  },
  USER_NOT_FOUND: {
    errorCode: 10002,
    message: '해당 유저가 존재하지 않습니다.',
    statusCode: 404,
  },
  

  
}

export class CustomException extends HttpException {
  constructor(
    public readonly errorCode: number,
    public readonly message: string,
    public readonly statusCode: number,
  ) {
    super({ errorCode, message }, statusCode);
  }
}