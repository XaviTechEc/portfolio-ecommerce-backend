import { Resolver } from '@nestjs/graphql';
import { CommentUseCases } from 'src/comments/application/use-cases/comment-use-cases';
import {
  CreateCommentInput,
  UpdateCommentInput,
} from 'src/comments/domain/dtos/graphql/inputs/comment.input';
import { CommentType } from 'src/comments/interface-adapters/graphql/object-types/comment.type';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';

@Resolver(() => CommentType)
export class CommentResolver extends BaseResolver(CommentType, {
  useCasesRef: CommentUseCases,
  createInputRef: CreateCommentInput,
  updateInputRef: UpdateCommentInput,
}) {
  constructor(private commentUseCases: CommentUseCases) {
    super(commentUseCases);
  }
}
