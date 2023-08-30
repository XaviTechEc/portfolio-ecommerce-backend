import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CommentFactoryService } from './comment-factory.service';
import { ICommentsRepository } from 'src/core/abstracts/repositories';
import { CreateCommentInput, UpdateCommentInput } from 'src/core/dtos';
import { IComment } from 'src/core/entities';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class CommentUseCases implements ICommentsRepository<IComment> {
  constructor(
    private dataService: IDataSourcesService,
    private commentFactoryService: CommentFactoryService,
  ) {}
  getCommentById(id: string): Promise<IComment> {
    throw new Error('Method not implemented.');
  }
  getCommentsBy(
    fields: Partial<IComment>,
    args?: IGenericArgs<IComment>,
  ): Promise<IComment[]> {
    throw new Error('Method not implemented.');
  }
  createComment(createCommentInput: CreateCommentInput): Promise<IComment> {
    throw new Error('Method not implemented.');
  }
  updateComment(
    id: string,
    updateCommentInput: UpdateCommentInput,
  ): Promise<IComment> {
    throw new Error('Method not implemented.');
  }
  removeComment(id: string): Promise<IComment> {
    throw new Error('Method not implemented.');
  }
}
