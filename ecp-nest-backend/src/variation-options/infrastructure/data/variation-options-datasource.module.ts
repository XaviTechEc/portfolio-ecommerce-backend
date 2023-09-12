import { Module } from '@nestjs/common';
import { IVariationOptionsDataSourceService } from '../../domain/abstracts/services/variation-options-datasource.abstract.service';
import { VariationOptionsDataService } from './variation-options-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationOption } from './postgresql/entities/VariationOption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VariationOption])],
  providers: [
    {
      provide: IVariationOptionsDataSourceService,
      useClass: VariationOptionsDataService,
    },
  ],
  exports: [IVariationOptionsDataSourceService],
})
export class VariationOptionsDataSourceModule {}
