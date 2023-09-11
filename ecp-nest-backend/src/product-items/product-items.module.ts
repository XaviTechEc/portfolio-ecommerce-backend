import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductItemFactoryService } from './application/use-cases/factory/product-item-factory.service';
import { ProductItemUseCases } from './application/use-cases/product-item-use-cases';
import { ProductItemsDataSourceModule } from './infrastructure/data/product-items-datasource.module';
import { ProductItemResolver } from './interface-adapters/resolvers/product-item.resolver';

@Module({
  imports: [ProductItemsDataSourceModule],
  providers: [
    ProductItemFactoryService,
    ProductItemUseCases,
    ProductItemResolver,
  ],
  exports: [TypeOrmModule],
})
export class ProductItemsModule {}
