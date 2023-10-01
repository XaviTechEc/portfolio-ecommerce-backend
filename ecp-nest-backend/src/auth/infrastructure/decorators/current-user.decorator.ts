import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IUser } from 'src/users/domain/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: IUser = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException('No user in request');
    }

    return user;
  },
);
