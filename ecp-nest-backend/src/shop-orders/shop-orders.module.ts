import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOrderFactoryService } from './application/use-cases/factory/shop-order-factory.service';
import { ShopOrderUseCases } from './application/use-cases/shop-order-use-cases';
import { ShopOrdersDataSourceModule } from './infrastructure/data/shop-orders-datasource.module';
import { ShopOrderResolver } from './interface-adapters/resolvers/shop-order.resolver';

@Module({
  imports: [ShopOrdersDataSourceModule],
  providers: [ShopOrderFactoryService, ShopOrderUseCases, ShopOrderResolver],
  exports: [TypeOrmModule],
})
export class ShopOrdersModule {}
