import { Injectable } from '@nestjs/common';
import { CreatePermissionInput } from 'src/permissions/domain/dto/graphql/inputs/create-permission.input';
import { UpdatePermissionInput } from 'src/permissions/domain/dto/graphql/inputs/update-permission.input';
import { IPermission } from 'src/permissions/domain/entities/permission.entity';

@Injectable()
export class PermissionFactoryService {
  createPermission(createPermissionInput: CreatePermissionInput) {
    const newPermission = new IPermission();
    newPermission.entity = createPermissionInput.entity;
    newPermission.operation = createPermissionInput.operation;
    newPermission.active = createPermissionInput.active;
    return newPermission;
  }

  updatePermission(updatePermissionInput: UpdatePermissionInput) {
    const newPermission = new IPermission();
    newPermission.id = updatePermissionInput.id;
    newPermission.entity = updatePermissionInput.entity;
    newPermission.operation = updatePermissionInput.operation;
    newPermission.active = updatePermissionInput.active;
    return newPermission;
  }
}
