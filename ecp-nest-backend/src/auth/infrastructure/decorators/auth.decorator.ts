import { UseGuards, applyDecorators } from '@nestjs/common';
import { GlobalJWTAuthGuard } from '../guards/global-auth.guard';
import { UserRolesGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';
import { RoleValue } from 'src/roles/domain/enums/role-value.enum';

export function Auth(...roles: RoleValue[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(GlobalJWTAuthGuard, UserRolesGuard),
  );
}
