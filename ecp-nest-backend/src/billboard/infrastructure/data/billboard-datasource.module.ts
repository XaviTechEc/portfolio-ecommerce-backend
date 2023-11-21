import { Module } from '@nestjs/common';
import { IBillboardsDataSourceService } from 'src/billboard/domain/abstracts/services/billboards-datasource.abstract.service';
import { BillboardDataService } from './billboard-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billboard } from './postgresql/entities/billboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billboard])],
  providers: [
    {
      provide: IBillboardsDataSourceService,
      useClass: BillboardDataService,
    },
  ],
  exports: [IBillboardsDataSourceService, TypeOrmModule],
})
export class BillboardDataSourceModule {}
