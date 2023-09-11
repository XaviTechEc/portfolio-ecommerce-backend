import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './infrastructure/data/postgresql/entities/Promotion.entity';
import { PromotionFactoryService } from './application/use-cases/factory/promotion-factory.service';
import { PromotionUseCases } from './application/use-cases/promotion-use-cases';
import { PromotionResolver } from './interface-adapters/resolvers/promotion.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion])],
  providers: [PromotionFactoryService, PromotionUseCases, PromotionResolver],
  exports: [TypeOrmModule],
})
export class PromotionsModule {}
