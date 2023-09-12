import { Injectable } from '@nestjs/common';
import { ICommentsRepository } from 'src/comments/domain/abstracts/repositories/comments.repository';
import { ICommentsDataSourceService } from 'src/comments/domain/abstracts/services/comments-datasource.abstract.service';
import {
  CreateCommentInput,
  UpdateCommentInput,
} from 'src/comments/domain/dtos/graphql/inputs/comment.input';
import { IComment } from 'src/comments/domain/entities/comment.entity';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { CommentFactoryService } from './comment-factory.service';

@Injectable()
export class CommentUseCases implements ICommentsRepository<IComment> {
  constructor(
    private dataService: ICommentsDataSourceService,
    private commentFactoryService: CommentFactoryService,
  ) {}
  getCommentsBy(
    term: string,
    fields: (keyof IComment)[],
    paginationArgs: PaginationArgs,
  ): Promise<IComment[]> {
    return this.dataService.comments.getCommentsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getCommentById(id: string): Promise<IComment> {
    return this.dataService.comments.getCommentById(id);
  }
  getAllComments(args?: IGenericArgs<IComment>): Promise<IComment[]> {
    return this.dataService.comments.getAllComments(args);
  }
  createComment(createCommentInput: CreateCommentInput): Promise<IComment> {
    const comment =
      this.commentFactoryService.createComment(createCommentInput);
    return this.dataService.comments.createComment(comment);
  }
  updateComment(
    id: string,
    updateCommentInput: UpdateCommentInput,
  ): Promise<IComment> {
    const comment =
      this.commentFactoryService.updateComment(updateCommentInput);
    return this.dataService.comments.updateComment(id, comment);
  }
  removeComment(id: string): Promise<IComment> {
    return this.dataService.comments.removeComment(id);
  }
}
