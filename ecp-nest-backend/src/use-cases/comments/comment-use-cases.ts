import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CommentFactoryService } from './comment-factory.service';
import { ICommentsRepository } from 'src/core/abstracts/repositories';
import { CreateCommentInput, UpdateCommentInput } from 'src/core/dtos';
import { IComment } from 'src/core/entities';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class CommentUseCases implements ICommentsRepository<IComment> {
  constructor(
    private dataService: IDataSourcesService,
    private commentFactoryService: CommentFactoryService,
  ) {}
  getCommentById(id: string): Promise<IComment> {
    return this.dataService.comments.getCommentById(id);
  }
  getCommentsBy(
    fields: Partial<IComment>,
    args?: IGenericArgs<IComment>,
  ): Promise<IComment[]> {
    return this.dataService.comments.getCommentsBy(fields, args);
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
