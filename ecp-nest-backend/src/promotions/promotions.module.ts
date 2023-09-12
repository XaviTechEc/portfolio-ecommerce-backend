import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionFactoryService } from './application/use-cases/factory/promotion-factory.service';
import { PromotionUseCases } from './application/use-cases/promotion-use-cases';
import { PromotionsDataSourceModule } from './infrastructure/data/promotions-datasource.module';
import { PromotionResolver } from './interface-adapters/resolvers/promotion.resolver';

@Module({
  imports: [PromotionsDataSourceModule],
  providers: [PromotionFactoryService, PromotionUseCases, PromotionResolver],
  exports: [TypeOrmModule],
})
export class PromotionsModule {}
