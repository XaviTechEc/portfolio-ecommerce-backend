import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { META_ROLES } from 'src/auth/domain/constants/meta.constants';
import { Role } from 'src/users/domain/enums';
import { matchRoles } from '../helpers/match-roles.helper';
import { IUser } from 'src/users/domain/entities/user.entity';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(META_ROLES, context.getHandler());
    if (!roles) return true;
    if (!roles.length) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as IUser;

    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    return matchRoles(roles, user.roles);
  }
}
