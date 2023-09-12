import { Module } from '@nestjs/common';
import { ReviewFactoryService } from './application/use-cases/factory/review-factory.service';
import { ReviewUseCases } from './application/use-cases/review-use-cases';
import { ReviewsDataSourceModule } from './infrastructure/data/reviews-datasource.module';
import { ReviewResolver } from './interface-adapters/resolvers/reviews.resolver';

@Module({
  imports: [ReviewsDataSourceModule],
  providers: [ReviewFactoryService, ReviewUseCases, ReviewResolver],
})
export class ReviewsModule {}
