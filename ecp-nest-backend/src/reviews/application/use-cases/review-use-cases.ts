import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IReviewsDataSourceService } from 'src/reviews/domain/abstracts/services/reviews-datasource.abstract.service';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from 'src/reviews/domain/dtos/graphql/inputs/review.input';
import { IReview } from 'src/reviews/domain/entities/review.entity';
import { ReviewFactoryService } from './factory/review-factory.service';

@Injectable()
export class ReviewUseCases {
  constructor(
    private dataServices: IReviewsDataSourceService,
    private reviewFactoryService: ReviewFactoryService,
  ) {}

  getMany(props: GetManyProps<IReview>) {
    return this.dataServices.reviews.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.reviews.getOneById({ ...props });
  }

  create(props: CreateProps<CreateReviewInput>) {
    const newReview = this.reviewFactoryService.createReview(props.data);
    return this.dataServices.reviews.create({ ...props, data: newReview });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateReviewInput>) {
    const newReview = this.reviewFactoryService.updateReview(props.data);
    return this.dataServices.reviews.updateOneById({
      ...props,
      data: newReview,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.reviews.deleteOneById({ ...props });
  }
}
