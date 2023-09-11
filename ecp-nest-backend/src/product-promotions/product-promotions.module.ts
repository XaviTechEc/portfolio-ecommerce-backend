import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPromotionFactoryService } from './application/use-cases/factory/product-promotion-factory.service';
import { ProductPromotionUseCases } from './application/use-cases/product-promotion-use-cases';
import { ProductPromotionsDataSourceModule } from './infrastructure/data/product-promotions-datasource.module';
import { ProductPromotionResolver } from './interface-adapters/resolvers/product-promotion.resolver';

@Module({
  imports: [ProductPromotionsDataSourceModule],
  providers: [
    ProductPromotionFactoryService,
    ProductPromotionUseCases,
    ProductPromotionResolver,
  ],
  exports: [TypeOrmModule],
})
export class ProductPromotionsModule {}
