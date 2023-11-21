import { Module } from '@nestjs/common';
import { PermissionFactoryService } from './application/use-cases/permission-factory.service';
import { PermissionUseCases } from './application/use-cases/permission-use-cases';
import { PermissionsDataSourceModule } from './infrastructure/data/permissions-datasource.module';
import { PermissionResolver } from './interface-adapters/graphql/resolvers/permissions.resolver';

@Module({
  imports: [PermissionsDataSourceModule],
  providers: [PermissionFactoryService, PermissionUseCases, PermissionResolver],
  exports: [PermissionsDataSourceModule, PermissionUseCases],
})
export class PermissionsModule {}
