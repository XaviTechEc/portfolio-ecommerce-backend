import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductConfigurationFactoryService } from './application/use-cases/factory/product-configuration-factory.service';
import { ProductConfigurationUseCases } from './application/use-cases/product-configuration-use-cases';
import { ProductConfigurationsDataSourceModule } from './infrastructure/data/product-configurations-datasource.module';
import { ProductConfigurationResolver } from './interface-adapters/resolvers/product-configuration.resolver';

@Module({
  imports: [ProductConfigurationsDataSourceModule],
  providers: [
    ProductConfigurationFactoryService,
    ProductConfigurationUseCases,
    ProductConfigurationResolver,
  ],
  exports: [TypeOrmModule],
})
export class ProductConfigurationsModule {}
