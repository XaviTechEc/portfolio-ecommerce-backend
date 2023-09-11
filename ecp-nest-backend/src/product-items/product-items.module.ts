import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductItem } from './infrastructure/data/postgresql/entities/ProductItem.entity';
import { ProductItemFactoryService } from './application/use-cases/factory/product-item-factory.service';
import { ProductItemUseCases } from './application/use-cases/product-item-use-cases';
import { ProductItemResolver } from './interface-adapters/resolvers/product-item.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ProductItem])],
  providers: [
    ProductItemFactoryService,
    ProductItemUseCases,
    ProductItemResolver,
  ],
  exports: [TypeOrmModule],
})
export class ProductItemsModule {}
