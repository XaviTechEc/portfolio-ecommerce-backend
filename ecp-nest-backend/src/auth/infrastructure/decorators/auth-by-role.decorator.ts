import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from 'src/users/domain/enums';
import { RoleProtected } from './role-protected.decorator';
import { UserRolesGuard } from '../guards/user-role.guard';

export function AuthByRole(...roles: Role[]) {
  return applyDecorators(RoleProtected(...roles), UseGuards(UserRolesGuard));
}
