import { ContextType, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { IExceptionsService } from '../../../common/domain/abstracts/services/exceptions/exceptions.abstract.service';

@Injectable()
export class GlobalJWTAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private _exceptionsService: IExceptionsService,
  ) {
    super();
  }

  getRequest(context: ExecutionContext) {
    let ctx: ExecutionContext | GraphQLExecutionContext;
    if (context.getType<ContextType | 'graphql'>() === 'graphql') {
      ctx = GqlExecutionContext.create(context);
      const request = (ctx as GraphQLExecutionContext).getContext().req;
      return request;
    }

    ctx = context;
    const request = ctx.switchToHttp().getRequest();
    return request;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let ctx: ExecutionContext | GraphQLExecutionContext;
    // Graphql context
    if (context.getType<ContextType | 'graphql'>() === 'graphql') {
      ctx = GqlExecutionContext.create(context);
    }

    ctx = context;
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!isPublic) {
      return super.canActivate(ctx);
    }

    return true;
  }
}
