import { Module } from '@nestjs/common';
import { IVariationsDataSourceService } from 'src/variations/domain/abstracts/services/variations-datasource.abstract.service';
import { VariationsDataService } from './variations-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variation } from './postgresql/entities/Variation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Variation])],
  providers: [
    {
      provide: IVariationsDataSourceService,
      useClass: VariationsDataService,
    },
  ],
  exports: [IVariationsDataSourceService, TypeOrmModule],
})
export class VariationsDataSourceModule {}
