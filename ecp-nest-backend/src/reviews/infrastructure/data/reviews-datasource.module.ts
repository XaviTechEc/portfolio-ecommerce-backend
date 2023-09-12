import { Module } from '@nestjs/common';
import { IReviewsDataSourceService } from 'src/reviews/domain/abstracts/services/reviews-datasource.abstract.service';
import { ReviewsDataService } from './reviews-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './postgresql/entities/Review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [
    {
      provide: IReviewsDataSourceService,
      useClass: ReviewsDataService,
    },
  ],
  exports: [IReviewsDataSourceService],
})
export class ReviewsDataSourceModule {}
