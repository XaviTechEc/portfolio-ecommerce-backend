import { Injectable } from '@nestjs/common';
import { CreateCommentInput, UpdateCommentInput } from 'src/core/dtos';
import { IComment } from 'src/core/entities';

@Injectable()
export class CommentFactoryService {
  createComment(createCommentInput: CreateCommentInput) {
    const newComment = new IComment();
    newComment.user = createCommentInput.user;
    newComment.content = createCommentInput.content;
    newComment.visible = createCommentInput.visible;
    newComment.review = createCommentInput.review;
    newComment.comment = createCommentInput.commentParent;
    return newComment;
  }
  updateComment(updateCommentInput: UpdateCommentInput) {
    const newComment = new IComment();
    newComment.user = updateCommentInput.user;
    newComment.content = updateCommentInput.content;
    newComment.visible = updateCommentInput.visible;
    newComment.review = updateCommentInput.review;
    newComment.comment = updateCommentInput.commentParent;
    return newComment;
  }
}
