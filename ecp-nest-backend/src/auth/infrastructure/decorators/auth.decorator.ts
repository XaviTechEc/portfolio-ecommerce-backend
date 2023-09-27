import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from 'src/users/domain/enums';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserRolesGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(JwtAuthGuard, UserRolesGuard),
  );
}
