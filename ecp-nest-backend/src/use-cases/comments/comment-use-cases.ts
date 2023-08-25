import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CommentFactoryService } from './comment-factory.service';
import { ICommentsRepository } from 'src/core/abstracts/repositories';
import { CreateCommentInput, UpdateCommentInput } from 'src/core/dtos';
import { IComment } from 'src/core/entities';

@Injectable()
export class CommentUseCases implements ICommentsRepository {
  constructor(
    private dataService: IDataSourcesService,
    private commentFactoryService: CommentFactoryService,
  ) {}
  getCommentById(id: string): Promise<IComment> {
    return this.dataService.comments.getOneById(id);
  }
  getCommentsBy(fields: Partial<IComment>): Promise<IComment[]> {
    return this.dataService.comments.getAllBy(fields);
  }
  createComment(createCommentInput: CreateCommentInput): Promise<IComment> {
    const comment =
      this.commentFactoryService.createComment(createCommentInput);
    return this.dataService.comments.create(comment);
  }
  updateComment(
    id: string,
    updateCommentInput: UpdateCommentInput,
  ): Promise<IComment> {
    const comment =
      this.commentFactoryService.updateComment(updateCommentInput);
    return this.dataService.comments.updateOneById(id, comment);
  }
  removeComment(id: string): Promise<IComment> {
    return this.dataService.comments.deleteOneById(id);
  }
}
