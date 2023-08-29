import { Injectable } from '@nestjs/common';
import { CreateReviewInput, UpdateReviewInput } from 'src/core/dtos';
import { IReview } from 'src/core/entities';

@Injectable()
export class ReviewFactoryService {
  createReview(createReviewInput: CreateReviewInput) {
    const newReview = new IReview();
    newReview.user = createReviewInput.userId;
    newReview.orderedProduct = createReviewInput.orderedProductId;
    newReview.ratingValue = createReviewInput.ratingValue;
    newReview.visible = createReviewInput.visible;
    return newReview;
  }
  updateReview(updateReviewInput: UpdateReviewInput) {
    const newReview = new IReview();
    newReview.user = updateReviewInput.userId;
    newReview.orderedProduct = updateReviewInput.orderedProductId;
    newReview.ratingValue = updateReviewInput.ratingValue;
    newReview.visible = updateReviewInput.visible;
    return newReview;
  }
}
