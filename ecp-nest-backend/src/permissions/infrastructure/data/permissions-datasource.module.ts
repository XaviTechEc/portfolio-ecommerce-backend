import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './postgresql/entities/Permission.entity';
import { IPermissionsDataSourceService } from 'src/permissions/domain/abstracts/services/permissions-datasource.abstract.service';
import { PermissionsDataService } from './permissions-datasource.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [
    {
      provide: IPermissionsDataSourceService,
      useClass: PermissionsDataService,
    },
  ],
  exports: [IPermissionsDataSourceService, TypeOrmModule],
})
export class PermissionsDataSourceModule {}
