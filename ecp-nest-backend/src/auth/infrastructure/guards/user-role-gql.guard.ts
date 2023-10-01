import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from 'src/users/domain/enums';
import { matchRoles } from '../helpers/match-roles.helper';
import { META_ROLES } from 'src/auth/domain/constants/meta.constants';

@Injectable()
export class UserRolesGqlGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    const roles = this.reflector.getAllAndOverride<Role[]>(META_ROLES, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!roles || !roles.length) {
      return true; // If no roles are required, return true
    }

    const user = ctx.getContext().req.user;
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    return matchRoles(roles, user.roles);
  }
}
