import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs, SearchArgs } from 'src/common/graphql/args';
import { IReview } from 'src/core/entities';
import { ReviewType } from 'src/core/object-types/reviews/review.type';

import { ReviewUseCases } from 'src/use-cases';

@Resolver(() => ReviewType)
export class ReviewsResolver {
  constructor(private reviewUseCases: ReviewUseCases) {}

  @Query(() => [ReviewType], { name: 'reviews' })
  getAllReviews(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IReview>,
  ) {
    return this.reviewUseCases.getAllReviews();
  }

  // @Query(() => ReviewType, { name: 'review' })
  // getReviewById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
  //   return this.reviewUseCases.getReviewById(id);
  // }

  // @Query(() => [ReviewType], { name: 'reviewsBy' })
  // getReviewsBy(@Args() paginationArgs: PaginationArgs) {
  //   return this.reviewUseCases.getReviewsBy({});
  // }
}
