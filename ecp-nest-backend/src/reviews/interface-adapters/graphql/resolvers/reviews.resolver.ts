import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ReviewUseCases } from 'src/reviews/application/use-cases/review-use-cases';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from 'src/reviews/domain/dtos/graphql/inputs/review.input';
import { ReviewType } from 'src/reviews/interface-adapters/graphql/object-types/review.type';

@Resolver(() => ReviewType)
export class ReviewResolver extends BaseResolver(ReviewType, {
  useCasesRef: ReviewUseCases,
  createInputRef: CreateReviewInput,
  updateInputRef: UpdateReviewInput,
}) {
  constructor(private reviewUseCases: ReviewUseCases) {
    super(reviewUseCases);
  }
}
