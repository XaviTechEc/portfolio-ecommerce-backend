import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryPromotion } from './infrastructure/data/postgresql/entities/CategoryPromotion.entity';
import { CategoryPromotionFactoryService } from './application/use-cases/factory/category-promotion-factory.service';
import { CategoryPromotionUseCases } from './application/use-cases/category-promotion-use-cases';
import { CategoryPromotionResolver } from './interface-adapters/resolvers/category-promotion.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryPromotion])],
  providers: [
    CategoryPromotionFactoryService,
    CategoryPromotionUseCases,
    CategoryPromotionResolver,
  ],
  exports: [TypeOrmModule],
})
export class CategoryPromotionsModule {}
