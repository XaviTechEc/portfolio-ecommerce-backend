import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateCommentInput,
  UpdateCommentInput,
} from '../../dtos/graphql/inputs/comment.input';

export abstract class ICommentsRepository<T> {
  abstract getCommentById(id: string): Promise<T>;
  abstract getAllComments(args?: IGenericArgs<T>): Promise<T[]>;
  abstract createComment(createCommentInput: CreateCommentInput): Promise<T>;
  abstract updateComment(
    id: string,
    updateCommentInput: UpdateCommentInput,
  ): Promise<T>;
  abstract removeComment(id: string): Promise<T>;

  abstract getCommentsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}
