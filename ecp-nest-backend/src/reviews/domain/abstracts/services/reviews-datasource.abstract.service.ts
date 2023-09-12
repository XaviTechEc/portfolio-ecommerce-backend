import { IReview } from '../../entities/review.entity';
import { IReviewsRepository } from '../repositories/reviews.repository';

export abstract class IReviewsDataSourceService {
  // Reviews
  abstract reviews: IReviewsRepository<IReview>;
}
