import { Module } from '@nestjs/common';
import { ShoppingCartFactoryService } from './application/use-cases/factory/shopping-cart-factory.service';
import { ShoppingCartUseCases } from './application/use-cases/shopping-cart-use-cases';
import { ShoppingCartsDataSourceModule } from './infrastructure/data/shopping-carts-datasource.module';
import { ShoppingCartResolver } from './interface-adapters/graphql/resolvers/shopping-cart.resolver';
import { ShoppingCartProductItemsModule } from 'src/shopping-cart-product-items/shopping-cart-product-items.module';

@Module({
  imports: [ShoppingCartsDataSourceModule, ShoppingCartProductItemsModule],
  providers: [
    ShoppingCartFactoryService,
    ShoppingCartUseCases,
    ShoppingCartResolver,
  ],
})
export class ShoppingCartsModule {}
