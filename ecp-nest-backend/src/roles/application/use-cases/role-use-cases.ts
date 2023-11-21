import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
  GetOneByNameProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { RoleFactoryService } from 'src/roles/application/use-cases/role-factory.service';
import { IRolesDataSourceService } from 'src/roles/domain/abstracts/services/roles-datasource.abstract.service';
import { CreateRoleInput } from 'src/roles/domain/dto/graphql/inputs/create-role.input';
import { UpdateRoleInput } from 'src/roles/domain/dto/graphql/inputs/update-role.input';
import { IRole } from 'src/roles/domain/entities/role.entity';

@Injectable()
export class RoleUseCases {
  constructor(
    private dataServices: IRolesDataSourceService,
    private roleFactoryService: RoleFactoryService,
  ) {}

  getMany(props: GetManyProps<IRole>) {
    return this.dataServices.roles.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.roles.getOneById({ ...props });
  }

  create(props: CreateProps<CreateRoleInput>) {
    const newRole = this.roleFactoryService.createRole(props.data);
    return this.dataServices.roles.create({ ...props, data: newRole });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateRoleInput>) {
    const newRole = this.roleFactoryService.updateRole(props.data);
    return this.dataServices.roles.updateOneById({
      ...props,
      data: newRole,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.roles.deleteOneById({ ...props });
  }

  // Custom
  getRoleByName(props: GetOneByNameProps) {
    return this.dataServices.roles.getRoleByName({ ...props });
  }
}
