import { registerEnumType } from '@nestjs/graphql';

export enum PermissionEntityAccess {
  // TODO: Add entities
  PRODUCT = 'product',
}

registerEnumType(PermissionEntityAccess, { name: 'PermissionEntity' });
