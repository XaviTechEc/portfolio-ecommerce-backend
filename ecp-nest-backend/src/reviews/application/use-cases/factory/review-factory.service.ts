import { Injectable } from '@nestjs/common';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from 'src/reviews/domain/dtos/graphql/inputs/review.input';
import { IReview } from 'src/reviews/domain/entities/review.entity';

@Injectable()
export class ReviewFactoryService {
  createReview(createReviewInput: CreateReviewInput) {
    const newReview = new IReview();
    newReview.user = createReviewInput.user;
    newReview.orderLine = createReviewInput.orderLine;
    newReview.ratingValue = createReviewInput.ratingValue;
    newReview.visible = createReviewInput.visible;
    newReview.content = createReviewInput.content;
    newReview.active = createReviewInput.active;
    return newReview;
  }
  updateReview(updateReviewInput: UpdateReviewInput) {
    const newReview = new IReview();
    newReview.id = updateReviewInput.id;
    newReview.user = updateReviewInput.user;
    newReview.orderLine = updateReviewInput.orderLine;
    newReview.ratingValue = updateReviewInput.ratingValue;
    newReview.visible = updateReviewInput.visible;
    newReview.content = updateReviewInput.content;
    newReview.active = updateReviewInput.active;
    return newReview;
  }
}
