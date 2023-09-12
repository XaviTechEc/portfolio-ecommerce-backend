import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOrderLocationFactoryService } from './application/use-cases/factory/shop-order-location-factory.service';
import { ShopOrderLocationUseCases } from './application/use-cases/shop-order-location-use-cases';
import { ShopOrderLocationsDataSourceModule } from './infrastructure/data/shop-order-locations-datasource.module';
import { ShopOrderLocationResolver } from './interface-adapters/resolvers/shop-order-location.resolver';

@Module({
  imports: [ShopOrderLocationsDataSourceModule],
  providers: [
    ShopOrderLocationFactoryService,
    ShopOrderLocationUseCases,
    ShopOrderLocationResolver,
  ],
  exports: [TypeOrmModule],
})
export class ShopOrderLocationsModule {}
