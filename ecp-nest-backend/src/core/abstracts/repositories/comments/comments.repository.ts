import { CreateCommentInput, UpdateCommentInput } from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';

export abstract class ICommentsRepository<T> {
  abstract getCommentById(id: string): Promise<T>;
  abstract getAllComments(args?: IGenericArgs<T>): Promise<T[]>;
  abstract createComment(createCommentInput: CreateCommentInput): Promise<T>;
  abstract updateComment(
    id: string,
    updateCommentInput: UpdateCommentInput,
  ): Promise<T>;
  abstract removeComment(id: string): Promise<T>;
}
