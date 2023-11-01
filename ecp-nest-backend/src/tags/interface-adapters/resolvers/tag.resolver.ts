import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { TagUseCases } from 'src/tags/application/use-cases/tag-use-cases';
import {
  CreateTagInput,
  UpdateTagInput,
} from 'src/tags/domain/dtos/graphql/inputs/tag.input';
import { TagType } from 'src/tags/domain/object-types/tag.type';

@Resolver(() => TagType)
export class TagResolver {
  constructor(private tagUseCases: TagUseCases) {}

  @Query(() => [TagType], { name: 'tags' })
  getAllTag(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.tagUseCases.getAllTags({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => TagType, { name: 'tag' })
  getTagById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.tagUseCases.getTagById(id);
  }

  @Mutation(() => TagType)
  createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.tagUseCases.createTag(createTagInput);
  }

  @Mutation(() => TagType)
  updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return this.tagUseCases.updateTag(updateTagInput.id, updateTagInput);
  }

  @Mutation(() => TagType)
  removeTag(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.tagUseCases.removeTag(id);
  }
}
