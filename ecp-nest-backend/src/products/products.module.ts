import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFactoryService } from './application/use-cases/factory/product-factory.service';
import { ProductUseCases } from './application/use-cases/product-use-cases';
import { ProductsDataSourceModule } from './infrastructure/data/products-datasource.module';
import { ProductResolver } from './interface-adapters/resolvers/product.resolver';

@Module({
  imports: [ProductsDataSourceModule],
  providers: [ProductFactoryService, ProductUseCases, ProductResolver],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
