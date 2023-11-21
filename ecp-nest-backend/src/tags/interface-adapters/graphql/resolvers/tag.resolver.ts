import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { TagUseCases } from 'src/tags/application/use-cases/tag-use-cases';
import {
  CreateTagInput,
  UpdateTagInput,
} from 'src/tags/domain/dtos/graphql/inputs/tag.input';
import { TagType } from 'src/tags/interface-adapters/graphql/object-types/tag.type';

@Resolver(() => TagType)
export class TagResolver extends BaseResolver(TagType, {
  useCasesRef: TagUseCases,
  createInputRef: CreateTagInput,
  updateInputRef: UpdateTagInput,
}) {
  constructor(private tagUseCases: TagUseCases) {
    super(tagUseCases);
  }
}
