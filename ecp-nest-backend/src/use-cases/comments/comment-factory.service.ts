import { Injectable } from '@nestjs/common';
import { CreateCommentInput, UpdateCommentInput } from 'src/core/dtos';
import { IComment } from 'src/core/entities';

@Injectable()
export class CommentFactoryService {
  createComment(createCommentInput: CreateCommentInput) {
    const newComment = new IComment();
    newComment.user = createCommentInput.userId;
    newComment.content = createCommentInput.content;
    newComment.visible = createCommentInput.visible;
    newComment.reviewId = createCommentInput.reviewId;
    newComment.commentParentId = createCommentInput.commentParentId;
    return newComment;
  }
  updateComment(updateCommentInput: UpdateCommentInput) {
    const newComment = new IComment();
    newComment.user = updateCommentInput.userId;
    newComment.content = updateCommentInput.content;
    newComment.visible = updateCommentInput.visible;
    newComment.reviewId = updateCommentInput.reviewId;
    newComment.commentParentId = updateCommentInput.commentParentId;
    return newComment;
  }
}
