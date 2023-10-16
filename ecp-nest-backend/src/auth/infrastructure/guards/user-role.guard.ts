import {
  CanActivate,
  ContextType,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { META_ROLES } from 'src/auth/domain/constants/meta.constants';
import { Role } from 'src/users/domain/enums';
import { matchRoles } from '../helpers/match-roles.helper';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    let ctx: GraphQLExecutionContext | ExecutionContext;
    let user: any;

    // Graphql
    if (context.getType<ContextType | 'graphql'>() === 'graphql') {
      ctx = GqlExecutionContext.create(context);
      user = (ctx as GraphQLExecutionContext).getContext().req.user;
    }

    // Rest
    ctx = context;
    user = ctx.switchToHttp().getRequest().user;
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(META_ROLES, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    // Validations
    if (!requiredRoles) return true;
    if (!requiredRoles.length) return true;

    if (!user) {
      throw new InternalServerErrorException('User is not authenticated');
    }

    return matchRoles(requiredRoles, user.roles);
  }
}
