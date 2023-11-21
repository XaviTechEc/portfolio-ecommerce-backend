import { registerEnumType } from '@nestjs/graphql';

export enum PermissionOperation {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  ALL = 'all',
  NONE = 'none',
}

registerEnumType(PermissionOperation, { name: 'PermissionOperation' });
