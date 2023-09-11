import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOrder } from './infrastructure/data/postgresql/entities/ShopOrder.entity';
import { ShopOrderFactoryService } from './application/use-cases/factory/shop-order-factory.service';
import { ShopOrderUseCases } from './application/use-cases/shop-order-use-cases';
import { ShopOrderResolver } from './interface-adapters/resolvers/shop-order.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ShopOrder])],
  providers: [ShopOrderFactoryService, ShopOrderUseCases, ShopOrderResolver],
  exports: [TypeOrmModule],
})
export class ShopOrdersModule {}
