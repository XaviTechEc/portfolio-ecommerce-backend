import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IPermissionsDataSourceService } from 'src/permissions/domain/abstracts/services/permissions-datasource.abstract.service';
import { CreatePermissionInput } from 'src/permissions/domain/dto/graphql/inputs/create-permission.input';
import { UpdatePermissionInput } from 'src/permissions/domain/dto/graphql/inputs/update-permission.input';
import { IPermission } from 'src/permissions/domain/entities/permission.entity';
import { PermissionFactoryService } from './permission-factory.service';

@Injectable()
export class PermissionUseCases {
  constructor(
    private dataServices: IPermissionsDataSourceService,
    private permissionFactoryService: PermissionFactoryService,
  ) {}

  getMany(props: GetManyProps<IPermission>) {
    return this.dataServices.permissions.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.permissions.getOneById({ ...props });
  }

  create(props: CreateProps<CreatePermissionInput>) {
    const newPermission = this.permissionFactoryService.createPermission(
      props.data,
    );
    return this.dataServices.permissions.create({
      ...props,
      data: newPermission,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdatePermissionInput>) {
    const newPermission = this.permissionFactoryService.updatePermission(
      props.data,
    );
    return this.dataServices.permissions.updateOneById({
      ...props,
      data: newPermission,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.permissions.deleteOneById({ ...props });
  }
}
