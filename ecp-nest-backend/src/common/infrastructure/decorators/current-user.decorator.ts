import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IUser } from 'src/users/domain/entities/user.entity';
import { Role } from 'src/users/domain/enums';

export const CurrentUser = createParamDecorator(
  (roles: Role[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: IUser = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException('No user in request');
    }

    if (!roles.length) return user;

    const rolesMatch = roles.some((role) => user.role === role);

    if (!rolesMatch) {
      throw new ForbiddenException('User role is not valid');
    }

    return user;
  },
);
