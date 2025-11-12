export class HttpError extends Error {
  public httpStatusCode!: number;
  public code!: string;

  constructor(httpStatusCode: number, message: string, code: string) {
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.code = code;
  }
}
