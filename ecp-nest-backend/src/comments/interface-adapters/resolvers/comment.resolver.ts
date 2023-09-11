import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import { CommentUseCases } from 'src/comments/application/use-cases/comment-use-cases';
import {
  CreateCommentInput,
  UpdateCommentInput,
} from 'src/comments/domain/dtos/graphql/inputs/comment.input';
import { IComment } from 'src/comments/domain/entities/comment.entity';
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
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<IComment> {
    return this.commentUseCases.createComment(createCommentInput);
  }

  @Mutation(() => CommentType)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
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
