import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOrderLocation } from './infrastructure/data/postgresql/entities/ShopOrderLocation.entity';
import { ShopOrderLocationFactoryService } from './application/use-cases/factory/shop-order-location-factory.service';
import { ShopOrderLocationUseCases } from './application/use-cases/shop-order-location-use-cases';
import { ShopOrderLocationResolver } from './interface-adapters/resolvers/shop-order-location.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ShopOrderLocation])],
  providers: [
    ShopOrderLocationFactoryService,
    ShopOrderLocationUseCases,
    ShopOrderLocationResolver,
  ],
  exports: [TypeOrmModule],
})
export class ShopOrderLocationsModule {}
