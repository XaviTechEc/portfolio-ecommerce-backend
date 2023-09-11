import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductConfiguration } from './infrastructure/data/postgresql/entities/ProductConfiguration.entity';
import { ProductConfigurationFactoryService } from './application/use-cases/factory/product-configuration-factory.service';
import { ProductConfigurationUseCases } from './application/use-cases/product-configuration-use-cases';
import { ProductConfigurationResolver } from './interface-adapters/resolvers/product-configuration.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ProductConfiguration])],
  providers: [
    ProductConfigurationFactoryService,
    ProductConfigurationUseCases,
    ProductConfigurationResolver,
  ],
  exports: [TypeOrmModule],
})
export class ProductConfigurationsModule {}
