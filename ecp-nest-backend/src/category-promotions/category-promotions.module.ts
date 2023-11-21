import { Module } from '@nestjs/common';
import { CategoryPromotionUseCases } from './application/use-cases/category-promotion-use-cases';
import { CategoryPromotionFactoryService } from './application/use-cases/factory/category-promotion-factory.service';
import { CategoryPromotionsDataSourceModule } from './infrastructure/data/category-promotions-datasource.module';
import { CategoryPromotionResolver } from './interface-adapters/graphql/resolvers/category-promotion.resolver';

@Module({
  imports: [CategoryPromotionsDataSourceModule],
  providers: [
    CategoryPromotionFactoryService,
    CategoryPromotionUseCases,
    CategoryPromotionResolver,
  ],
  exports: [CategoryPromotionFactoryService, CategoryPromotionUseCases],
})
export class CategoryPromotionsModule {}
