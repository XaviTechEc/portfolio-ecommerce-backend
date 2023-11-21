import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from '../../domain/dto/graphql/inputs/create-role.input';
import { IRole } from '../../domain/entities/role.entity';
import { UpdateRoleInput } from '../../domain/dto/graphql/inputs/update-role.input';

@Injectable()
export class RoleFactoryService {
  createRole(createRoleInput: CreateRoleInput) {
    const newRole = new IRole();
    newRole.value = createRoleInput.value;
    newRole.active = createRoleInput.active;
    return newRole;
  }

  updateRole(updateRoleInput: UpdateRoleInput) {
    const newRole = new IRole();
    newRole.id = updateRoleInput.id;
    newRole.value = updateRoleInput.value;
    newRole.active = updateRoleInput.active;
    return newRole;
  }
}
