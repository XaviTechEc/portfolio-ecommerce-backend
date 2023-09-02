import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
  SUPER_ADMIN = 'super_admin',
}

registerEnumType(Role, { name: 'Role' });
