import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ReviewUseCases } from 'src/reviews/application/use-cases/review-use-cases';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from 'src/reviews/domain/dtos/graphql/inputs/review.input';
import { IReview } from 'src/reviews/domain/entities/review.entity';
import { ReviewType } from 'src/reviews/domain/object-types/review.type';

@Resolver(() => ReviewType)
export class ReviewResolver {
  constructor(private reviewUseCases: ReviewUseCases) {}

  @Query(() => [ReviewType], { name: 'reviews' })
  getAllReview(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IReview[]> {
    return this.reviewUseCases.getAllReviews({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ReviewType], { name: 'reviewsByUser' })
  getReviewsByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IReview[]> {
    return this.reviewUseCases.getReviewsBy(term, ['user'], paginationArgs);
  }

  @Query(() => [ReviewType], { name: 'reviewsByOrderLine' })
  getReviewsByOrderLine(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IReview[]> {
    return this.reviewUseCases.getReviewsBy(
      term,
      ['orderLine'],
      paginationArgs,
    );
  }

  @Query(() => ReviewType, { name: 'review' })
  getReviewById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IReview> {
    return this.reviewUseCases.getReviewById(id);
  }

  @Mutation(() => ReviewType)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ): Promise<IReview> {
    return this.reviewUseCases.createReview(createReviewInput);
  }

  @Mutation(() => ReviewType)
  updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ): Promise<IReview> {
    return this.reviewUseCases.updateReview(
      updateReviewInput.id,
      updateReviewInput,
    );
  }

  @Mutation(() => ReviewType)
  removeReview(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IReview> {
    return this.reviewUseCases.removeReview(id);
  }
}
