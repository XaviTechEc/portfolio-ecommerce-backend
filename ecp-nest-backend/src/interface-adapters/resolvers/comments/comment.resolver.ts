import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateCommentInput,
  PaginationArgs,
  SearchArgs,
  UpdateCommentInput,
} from 'src/core/dtos';
import { IComment } from 'src/core/entities';
import { CommentType } from 'src/core/object-types';
import { CommentUseCases } from 'src/use-cases';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => CommentType)
export class CommentResolver {
  constructor(private commentUseCases: CommentUseCases) {}
  @Query(() => [CommentType], { name: 'comments' })
  getAllComments(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IComment[]> {
    return this.commentUseCases.getAllComments({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [CommentType], { name: 'commentsByUser' })
  getCommentsByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IComment[]> {
    return this.commentUseCases.getCommentsBy(term, ['user'], paginationArgs);
  }

  @Query(() => [CommentType], { name: 'commentsByReview' })
  getCommentsByReview(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IComment[]> {
    return this.commentUseCases.getCommentsBy(term, ['review'], paginationArgs);
  }

  @Query(() => [CommentType], { name: 'commentsByParentComment' })
  getCommentsByParentComment(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IComment[]> {
    return this.commentUseCases.getCommentsBy(
      term,
      ['comment'],
      paginationArgs,
    );
  }

  @Query(() => CommentType, { name: 'comment' })
  getCommentById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IComment> {
    return this.commentUseCases.getCommentById(id);
  }

  @Mutation(() => CommentType)
  createComment(
    @Args() createCommentInput: CreateCommentInput,
  ): Promise<IComment> {
    return this.commentUseCases.createComment(createCommentInput);
  }

  @Mutation(() => CommentType)
  updateComment(
    @Args() updateCommentInput: UpdateCommentInput,
  ): Promise<IComment> {
    return this.commentUseCases.updateComment(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => CommentType)
  removeComment(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IComment> {
    return this.commentUseCases.removeComment(id);
  }
}
