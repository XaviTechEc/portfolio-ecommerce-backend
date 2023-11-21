import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { RoleUseCases } from 'src/roles/application/use-cases/role-use-cases';
import { CreateRoleInput } from 'src/roles/domain/dto/graphql/inputs/create-role.input';
import { UpdateRoleInput } from 'src/roles/domain/dto/graphql/inputs/update-role.input';
import { RoleType } from '../object-types/role.type';
import { GetRoleByNameResponseType } from '../object-types/get-role-by-name-response.type';
import { CurrentUser } from 'src/auth/infrastructure/decorators/current-user.decorator';
import { IUser } from 'src/users/domain/entities/user.entity';

@Resolver(() => RoleType)
export class RoleResolver extends BaseResolver(RoleType, {
  useCasesRef: RoleUseCases,
  createInputRef: CreateRoleInput,
  updateInputRef: UpdateRoleInput,
}) {
  constructor(private roleUseCases: RoleUseCases) {
    super(roleUseCases);
  }

  // Custom
  @Query(() => GetRoleByNameResponseType, { name: 'getRoleTypeByName' })
  async getRoleByName(
    @Args('name', { type: () => String }) name: string,
    @CurrentUser() user: IUser,
  ) {
    return this.roleUseCases.getRoleByName({ name, user });
  }
}
