import { IReview } from 'src/core/entities';
import { IReviewsRepository } from '../../repositories';

export abstract class IPostgresDataSourceService {
  abstract reviews: IReviewsRepository<IReview>;
}
