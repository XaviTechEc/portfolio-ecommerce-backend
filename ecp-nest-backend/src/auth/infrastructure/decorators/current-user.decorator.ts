import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IUser } from 'src/users/domain/entities/user.entity';
import { Role } from 'src/users/domain/enums';
import { matchRoles } from '../helpers/match-roles.helper';

export const CurrentUser = createParamDecorator(
  (roles: Role[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: IUser = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException('No user in request');
    }

    if (!roles.length) return user;

    const rolesMatch = matchRoles(roles, user.roles || []);

    if (!rolesMatch) {
      throw new ForbiddenException('User role is not valid');
    }

    return user;
  },
);
