import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IRolesDataSourceService } from 'src/roles/domain/abstracts/services/roles-datasource.abstract.service';
import { Role } from './postgresql/entities/Role.entity';
import { RolesDataService } from './roles-datasource.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [
    {
      provide: IRolesDataSourceService,
      useClass: RolesDataService,
    },
  ],
  exports: [IRolesDataSourceService, TypeOrmModule],
})
export class RolesDataSourceModule {}
