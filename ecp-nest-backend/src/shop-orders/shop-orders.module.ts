import { Module } from '@nestjs/common';
import { ShopOrderFactoryService } from './application/use-cases/factory/shop-order-factory.service';
import { ShopOrderUseCases } from './application/use-cases/shop-order-use-cases';
import { ShopOrdersDataSourceModule } from './infrastructure/data/shop-orders-datasource.module';
import { ShopOrderResolver } from './interface-adapters/resolvers/shop-order.resolver';
import { ShopOrderLocationsModule } from 'src/shop-order-locations/shop-order-locations.module';

@Module({
  imports: [ShopOrdersDataSourceModule, ShopOrderLocationsModule],
  providers: [ShopOrderFactoryService, ShopOrderUseCases, ShopOrderResolver],
})
export class ShopOrdersModule {}
