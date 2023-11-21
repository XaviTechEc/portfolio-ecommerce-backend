import {
  ContextType,
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { IUser } from 'src/users/domain/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (
    data: keyof IUser | (keyof IUser)[] | undefined,
    context: ExecutionContext,
  ) => {
    let ctx: GraphQLExecutionContext | ExecutionContext;
    let user: IUser;
    let dataToSend: any;

    // Graphql
    if (context.getType<ContextType | 'graphql'>() === 'graphql') {
      ctx = GqlExecutionContext.create(context);
      user = (ctx as GraphQLExecutionContext).getContext().req.user;
    } else {
      // Rest
      ctx = context;
      user = ctx.switchToHttp().getRequest().user;
    }

    if (!user) {
      throw new InternalServerErrorException('[PARAM] - No user in request');
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

    if (Array.isArray(data)) {
      dataToSend = {};
      data.forEach((property) => {
        if (!user[property]) {
          throw new InternalServerErrorException(
            `Property ${property} not found in user`,
          );
        }
        dataToSend[property] = user[property];
      });
    }

    return dataToSend;
  },
);
