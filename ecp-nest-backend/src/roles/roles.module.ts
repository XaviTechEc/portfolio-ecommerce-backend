import { Module } from '@nestjs/common';
import { RoleFactoryService } from './application/use-cases/role-factory.service';
import { RoleUseCases } from './application/use-cases/role-use-cases';
import { RolesDataSourceModule } from './infrastructure/data/roles-datasource.module';
import { RoleResolver } from './interface-adapters/graphql/resolvers/roles.resolver';

@Module({
  imports: [RolesDataSourceModule],
  providers: [RoleFactoryService, RoleUseCases, RoleResolver],
})
export class RolesModule {}
