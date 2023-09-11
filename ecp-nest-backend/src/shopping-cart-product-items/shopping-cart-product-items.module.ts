import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartProductItem } from './infrastructure/data/postgresql/entities/ShoppingCartProductItem.entity';
import { ShoppingCartProductItemFactoryService } from './application/use-cases/factory/shopping-cart-product-item-factory.service';
import { ShoppingCartProductItemUseCases } from './application/use-cases/shopping-cart-product-item-use-cases';
import { ShoppingCartProductItemResolver } from './interface-adapters/resolvers/shopping-cart-product-item.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCartProductItem])],
  providers: [
    ShoppingCartProductItemFactoryService,
    ShoppingCartProductItemUseCases,
    ShoppingCartProductItemResolver,
  ],
  exports: [TypeOrmModule],
})
export class ShoppingCartProductItemsModule {}
