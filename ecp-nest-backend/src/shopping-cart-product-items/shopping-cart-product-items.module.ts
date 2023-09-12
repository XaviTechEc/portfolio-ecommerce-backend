import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartProductItemFactoryService } from './application/use-cases/factory/shopping-cart-product-item-factory.service';
import { ShoppingCartProductItemUseCases } from './application/use-cases/shopping-cart-product-item-use-cases';
import { ShoppingCartProductItemsDataSourceModule } from './infrastructure/data/shopping-cart-product-items-datasource.module';
import { ShoppingCartProductItemResolver } from './interface-adapters/resolvers/shopping-cart-product-item.resolver';

@Module({
  imports: [ShoppingCartProductItemsDataSourceModule],
  providers: [
    ShoppingCartProductItemFactoryService,
    ShoppingCartProductItemUseCases,
    ShoppingCartProductItemResolver,
  ],
  exports: [TypeOrmModule],
})
export class ShoppingCartProductItemsModule {}
