import { IComment } from 'src/core/entities';

export abstract class ICommentsRepository {
  abstract getCommentById(id: string): Promise<IComment>;
  abstract getCommentsBy(fields: Partial<IComment>): Promise<IComment[]>;
  abstract createComment(createCommentInput: any): Promise<IComment>;
  abstract updateComment(updateCommentInput: any): Promise<IComment>;
  abstract removeComment(id: string): Promise<boolean>;
}
