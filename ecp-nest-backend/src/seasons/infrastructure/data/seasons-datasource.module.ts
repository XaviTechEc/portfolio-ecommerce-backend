import { Module } from '@nestjs/common';
import { ISeasonsDataSourceService } from 'src/seasons/domain/abstracts/services/seasons-datasource.abstract.service';
import { SeasonsDataService } from './seasons-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './postgresql/entities/Season.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Season])],
  providers: [
    {
      provide: ISeasonsDataSourceService,
      useClass: SeasonsDataService,
    },
  ],
  exports: [ISeasonsDataSourceService, TypeOrmModule],
})
export class SeasonsDataSourceModule {}
