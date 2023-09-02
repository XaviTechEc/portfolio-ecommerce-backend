import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateReviewInput,
  UpdateReviewInput,
} from 'src/core/dtos';
import { IReview } from 'src/core/entities';
import { ReviewType } from 'src/core/object-types';
import { ReviewUseCases } from 'src/use-cases';

@Resolver(() => ReviewType)
export class ReviewResolver {
  constructor(private reviewUseCases: ReviewUseCases) {}

  @Query(() => [ReviewType], { name: 'reviews' })
  getAllReview(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IReview>,
  ): Promise<IReview[]> {
    return this.reviewUseCases.getAllReviews({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => ReviewType, { name: 'review' })
  getReviewById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IReview> {
    return this.reviewUseCases.getReviewById(id);
  }

  @Mutation(() => ReviewType)
  createReview(@Args() createReviewInput: CreateReviewInput): Promise<IReview> {
    return this.reviewUseCases.createReview(createReviewInput);
  }

  @Mutation(() => ReviewType)
  updateReview(@Args() updateReviewInput: UpdateReviewInput): Promise<IReview> {
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
