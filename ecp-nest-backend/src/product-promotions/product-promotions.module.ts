import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPromotion } from './infrastructure/data/postgresql/entities/ProductPromotion.entity';
import { ProductPromotionFactoryService } from './application/use-cases/factory/product-promotion-factory.service';
import { ProductPromotionUseCases } from './application/use-cases/product-promotion-use-cases';
import { ProductPromotionResolver } from './interface-adapters/resolvers/product-promotion.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPromotion])],
  providers: [
    ProductPromotionFactoryService,
    ProductPromotionUseCases,
    ProductPromotionResolver,
  ],
  exports: [TypeOrmModule],
})
export class ProductPromotionsModule {}
