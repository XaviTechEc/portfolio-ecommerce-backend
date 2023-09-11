import { Module } from '@nestjs/common';
import { IProductConfigurationDataSourceService } from 'src/product-configurations/domain/abstracts/services/product-configuration-datasource.abstract.service';
import { ProductConfigurationDataService } from './product-configurations-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductConfiguration } from './postgresql/entities/ProductConfiguration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductConfiguration])],
  providers: [
    {
      provide: IProductConfigurationDataSourceService,
      useClass: ProductConfigurationDataService,
    },
  ],
  exports: [IProductConfigurationDataSourceService],
})
export class ProductConfigurationsDataSourceModule {}
