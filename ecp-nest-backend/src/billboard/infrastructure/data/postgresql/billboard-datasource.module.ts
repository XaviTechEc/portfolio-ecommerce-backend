import { Module } from '@nestjs/common';
import { IBillboardDataSourceService } from 'src/billboard/domain/abstracts/services/billboard-datasource.abstract.service';
import { BillboardDataService } from './billboard-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billboard } from './entities/billboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billboard])],
  providers: [
    {
      provide: IBillboardDataSourceService,
      useClass: BillboardDataService,
    },
  ],
  exports: [IBillboardDataSourceService, TypeOrmModule],
})
export class BillboardDataSourceModule {}
