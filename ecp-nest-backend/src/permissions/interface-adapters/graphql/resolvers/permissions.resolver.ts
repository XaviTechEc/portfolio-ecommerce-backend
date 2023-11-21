import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { PermissionUseCases } from 'src/permissions/application/use-cases/permission-use-cases';
import { CreatePermissionInput } from 'src/permissions/domain/dto/graphql/inputs/create-permission.input';
import { UpdatePermissionInput } from 'src/permissions/domain/dto/graphql/inputs/update-permission.input';
import { PermissionType } from '../object-types/permission.type';

@Resolver(() => PermissionType)
export class PermissionResolver extends BaseResolver(PermissionType, {
  useCasesRef: PermissionUseCases,
  createInputRef: CreatePermissionInput,
  updateInputRef: UpdatePermissionInput,
}) {
  constructor(private permissionUseCases: PermissionUseCases) {
    super(permissionUseCases);
  }
}
