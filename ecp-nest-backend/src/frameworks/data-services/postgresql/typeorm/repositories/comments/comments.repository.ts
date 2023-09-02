import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ICommentsRepository } from 'src/core/abstracts/repositories';
import { CreateCommentInput, UpdateCommentInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Comment } from '../../entities/outputs/entities';

export class CommentsRepository implements ICommentsRepository<Comment> {
  private _repository: Repository<Comment>;

  constructor(repository: Repository<Comment>) {
    this._repository = repository;
  }
  getCommentById(id: string): Promise<Comment> {
    throw new Error('Method not implemented.');
  }
  getCommentsBy(
    fields: Partial<Comment>,
    args?: IGenericArgs<Comment>,
  ): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }
  createComment(createCommentInput: CreateCommentInput): Promise<Comment> {
    throw new Error('Method not implemented.');
  }
  updateComment(
    id: string,
    updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    throw new Error('Method not implemented.');
  }
  removeComment(id: string): Promise<Comment> {
    throw new Error('Method not implemented.');
  }
}
