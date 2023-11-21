import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleProtected } from './role-protected.decorator';
import { UserRolesGuard } from '../guards/user-role.guard';
import { RoleValue } from 'src/roles/domain/enums/role-value.enum';

export function AuthByRole(...roles: RoleValue[]) {
  return applyDecorators(RoleProtected(...roles), UseGuards(UserRolesGuard));
}
