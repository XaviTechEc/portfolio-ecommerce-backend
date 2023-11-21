import { Injectable } from '@nestjs/common';
import { ICommentsDataSourceService } from 'src/comments/domain/abstracts/services/comments-datasource.abstract.service';
import {
  CreateCommentInput,
  UpdateCommentInput,
} from 'src/comments/domain/dtos/graphql/inputs/comment.input';
import { IComment } from 'src/comments/domain/entities/comment.entity';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { CommentFactoryService } from './comment-factory.service';

@Injectable()
export class CommentUseCases {
  constructor(
    private dataServices: ICommentsDataSourceService,
    private commentFactoryService: CommentFactoryService,
  ) {}

  getMany(props: GetManyProps<IComment>) {
    return this.dataServices.comments.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.comments.getOneById({ ...props });
  }

  create(props: CreateProps<CreateCommentInput>) {
    const newComment = this.commentFactoryService.createComment(props.data);
    return this.dataServices.comments.create({ ...props, data: newComment });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateCommentInput>) {
    const newComment = this.commentFactoryService.updateComment(props.data);
    return this.dataServices.comments.updateOneById({
      ...props,
      data: newComment,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.comments.deleteOneById({ ...props });
  }
}
