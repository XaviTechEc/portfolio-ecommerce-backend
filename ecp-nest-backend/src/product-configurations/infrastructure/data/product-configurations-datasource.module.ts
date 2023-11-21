import { Module } from '@nestjs/common';
import { IProductConfigurationsDataSourceService } from 'src/product-configurations/domain/abstracts/services/product-configurations-datasource.abstract.service';
import { ProductConfigurationDataService } from './product-configurations-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductConfiguration } from './postgresql/entities/ProductConfiguration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductConfiguration])],
  providers: [
    {
      provide: IProductConfigurationsDataSourceService,
      useClass: ProductConfigurationDataService,
    },
  ],
  exports: [IProductConfigurationsDataSourceService, TypeOrmModule],
})
export class ProductConfigurationsDataSourceModule {}
