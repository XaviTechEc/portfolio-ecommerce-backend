export interface ICustomExceptionFormat {
  message: string;
  code_error?: number;
}

export interface IException {
  notFound(data: ICustomExceptionFormat): never;
  badRequest(data: ICustomExceptionFormat): never;
  internalServerError(data?: ICustomExceptionFormat): never;
  forbiddenException(data?: ICustomExceptionFormat): never;
  unauthorized(data?: ICustomExceptionFormat): never;
}
