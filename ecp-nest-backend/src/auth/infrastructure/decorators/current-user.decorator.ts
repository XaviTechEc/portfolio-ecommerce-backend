import {
  ContextType,
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    let ctx: GraphQLExecutionContext | ExecutionContext;
    let user: any;
    let dataToSend: any;

    // Graphql
    if (context.getType<ContextType | 'graphql'>() === 'graphql') {
      ctx = GqlExecutionContext.create(context);
      user = (ctx as GraphQLExecutionContext).getContext().req.user;
    }

    // Rest
    ctx = context;
    user = ctx.switchToHttp().getRequest().user;

    if (!user) {
      throw new InternalServerErrorException('No user in request');
    }

    if (!data) {
      dataToSend = user;
    }

    if (typeof data === 'string') {
      dataToSend = user[data];
      if (!dataToSend) {
        throw new InternalServerErrorException(
          `Property ${data} not found in user`,
        );
      }
    }

    return dataToSend;
  },
);
