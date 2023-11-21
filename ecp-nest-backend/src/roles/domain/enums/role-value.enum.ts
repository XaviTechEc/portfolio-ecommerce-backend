import { registerEnumType } from '@nestjs/graphql';

export enum RoleValue {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  CLIENT = 'client',
  CUSTOM = 'custom',
  // ...
}

registerEnumType(RoleValue, { name: 'RoleValue' });
