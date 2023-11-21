import { SetMetadata } from '@nestjs/common';
import { META_ROLES } from 'src/auth/domain/constants/meta.constants';
import { RoleValue } from 'src/roles/domain/enums/role-value.enum';

export const RoleProtected = (...roles: RoleValue[]) => {
  return SetMetadata(META_ROLES, roles);
};
