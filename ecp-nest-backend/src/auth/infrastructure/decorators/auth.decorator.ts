import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from 'src/users/domain/enums';
import { GlobalJWTAuthGuard } from '../guards/global-auth.guard';
import { UserRolesGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(GlobalJWTAuthGuard, UserRolesGuard),
  );
}
