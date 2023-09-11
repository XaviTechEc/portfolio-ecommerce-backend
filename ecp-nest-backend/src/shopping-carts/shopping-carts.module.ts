import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './infrastructure/data/postgresql/entities/ShoppingCart.entity';
import { ShoppingCartFactoryService } from './application/use-cases/factory/shopping-cart-factory.service';
import { ShoppingCartUseCases } from './application/use-cases/shopping-cart-use-cases';
import { ShoppingCartResolver } from './interface-adapters/resolvers/shopping-cart.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart])],
  providers: [
    ShoppingCartFactoryService,
    ShoppingCartUseCases,
    ShoppingCartResolver,
  ],
  exports: [TypeOrmModule],
})
export class ShoppingCartsModule {}
