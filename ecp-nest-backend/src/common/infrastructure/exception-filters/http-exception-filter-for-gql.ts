import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilterForGql implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    const ctx = gqlHost.getContext();

    const user = ctx.req.user;

    const response = exception.getResponse() as object;
    const statusCode = exception.getStatus();

    const exceptionResponse = {
      ...response,
      statusCode,
      timestamp: new Date().toISOString(),
      path: ctx.req.url,
      user: user ?? null,
    };

    const newException = new HttpException(exceptionResponse, statusCode);

    return newException;
  }
}
