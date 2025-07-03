export class ResponseDto<T> {
  constructor(
    private readonly message: string,
    private readonly data?: T 
  ) {}

  static success<T>(message: string, data?: T): ResponseDto<T> {
    return new ResponseDto(message, data);
  }
}