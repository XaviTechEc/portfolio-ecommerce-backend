import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ICommentsRepository } from 'src/core/abstracts/repositories';
import { CreateCommentInput, UpdateCommentInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class CommentsRepository<T> implements ICommentsRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getCommentById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getCommentsBy(fields: Partial<T>, args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  createComment(createCommentInput: CreateCommentInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateComment(
    id: string,
    updateCommentInput: UpdateCommentInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeComment(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
