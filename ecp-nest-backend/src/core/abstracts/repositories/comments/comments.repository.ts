import { CreateCommentInput, UpdateCommentInput } from 'src/core/dtos';
import { IComment } from 'src/core/entities';

export abstract class ICommentsRepository {
  abstract getCommentById(id: string): Promise<IComment>;
  abstract getCommentsBy(fields: Partial<IComment>): Promise<IComment[]>;
  abstract createComment(
    createCommentInput: CreateCommentInput,
  ): Promise<IComment>;
  abstract updateComment(
    id: string,
    updateCommentInput: UpdateCommentInput,
  ): Promise<IComment>;
  abstract removeComment(id: string): Promise<IComment>;
}
