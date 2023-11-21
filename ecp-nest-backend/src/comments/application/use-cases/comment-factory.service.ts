import { Injectable } from '@nestjs/common';
import {
  CreateCommentInput,
  UpdateCommentInput,
} from 'src/comments/domain/dtos/graphql/inputs/comment.input';
import { IComment } from 'src/comments/domain/entities/comment.entity';

@Injectable()
export class CommentFactoryService {
  createComment(createCommentInput: CreateCommentInput) {
    const newComment = new IComment();
    newComment.user = createCommentInput.user;
    newComment.content = createCommentInput.content;
    newComment.review = createCommentInput.review;
    newComment.comment = createCommentInput.commentParent;
    newComment.active = createCommentInput.active;
    return newComment;
  }
  updateComment(updateCommentInput: UpdateCommentInput) {
    const newComment = new IComment();
    newComment.id = updateCommentInput.id;
    newComment.user = updateCommentInput.user;
    newComment.content = updateCommentInput.content;
    newComment.review = updateCommentInput.review;
    newComment.comment = updateCommentInput.commentParent;
    newComment.active = updateCommentInput.active;
    return newComment;
  }
}
