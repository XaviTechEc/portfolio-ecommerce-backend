import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentUseCases } from 'src/comments/application/use-cases/comment-use-cases';
import {
  CreateCommentInput,
  UpdateCommentInput,
} from 'src/comments/domain/dtos/graphql/inputs/comment.input';
import { CommentType } from 'src/comments/domain/object-types/comment.type';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';

@Resolver(() => CommentType)
export class CommentResolver {
  constructor(private commentUseCases: CommentUseCases) {}
  @Query(() => [CommentType], { name: 'comments' })
  getAllComments(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.commentUseCases.getAllComments({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [CommentType], { name: 'commentsByUser' })
  getCommentsByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.commentUseCases.getCommentsBy(term, ['user'], paginationArgs);
  }

  @Query(() => [CommentType], { name: 'commentsByReview' })
  getCommentsByReview(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.commentUseCases.getCommentsBy(term, ['review'], paginationArgs);
  }

  @Query(() => [CommentType], { name: 'commentsByParentComment' })
  getCommentsByParentComment(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.commentUseCases.getCommentsBy(
      term,
      ['comment'],
      paginationArgs,
    );
  }

  @Query(() => CommentType, { name: 'comment' })
  getCommentById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.commentUseCases.getCommentById(id);
  }

  @Mutation(() => CommentType)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentUseCases.createComment(createCommentInput);
  }

  @Mutation(() => CommentType)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentUseCases.updateComment(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => CommentType)
  removeComment(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.commentUseCases.removeComment(id);
  }
}
