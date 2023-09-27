import { SetMetadata } from '@nestjs/common';
import { META_ROLES } from 'src/auth/domain/constants/meta.constants';
import { Role } from 'src/users/domain/enums';

export const RoleProtected = (...roles: Role[]) => {
  return SetMetadata(META_ROLES, roles);
};
