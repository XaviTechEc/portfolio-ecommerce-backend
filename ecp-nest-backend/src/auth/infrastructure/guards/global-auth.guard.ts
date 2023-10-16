import { ContextType, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class GlobalJWTAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    if (context.getType<ContextType | 'graphql'>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      return request;
    }

    return super.getRequest(context);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let ctx: ExecutionContext | GraphQLExecutionContext = context;
    // Graphql context
    if (context.getType<ContextType | 'graphql'>() === 'graphql') {
      ctx = GqlExecutionContext.create(context);
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!isPublic) {
      return super.canActivate(context);
    }

    return true;
  }
}
