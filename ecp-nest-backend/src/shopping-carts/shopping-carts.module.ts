import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartFactoryService } from './application/use-cases/factory/shopping-cart-factory.service';
import { ShoppingCartUseCases } from './application/use-cases/shopping-cart-use-cases';
import { ShoppingCartsDataSourceModule } from './infrastructure/data/shopping-carts-datasource.module';
import { ShoppingCartResolver } from './interface-adapters/resolvers/shopping-cart.resolver';

@Module({
  imports: [ShoppingCartsDataSourceModule],
  providers: [
    ShoppingCartFactoryService,
    ShoppingCartUseCases,
    ShoppingCartResolver,
  ],
  exports: [TypeOrmModule],
})
export class ShoppingCartsModule {}
