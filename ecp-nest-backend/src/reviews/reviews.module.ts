import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './infrastructure/data/postgresql/entities/Review.entity';
import { ReviewFactoryService } from './application/use-cases/factory/review-factory.service';
import { ReviewUseCases } from './application/use-cases/review-use-cases';
import { ReviewResolver } from './interface-adapters/resolvers/reviews.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewFactoryService, ReviewUseCases, ReviewResolver],
  exports: [TypeOrmModule],
})
export class ReviewsModule {}
