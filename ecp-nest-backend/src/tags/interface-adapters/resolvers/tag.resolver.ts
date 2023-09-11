import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateTagInput,
  UpdateTagInput,
} from 'src/core/dtos';
import { ITag } from 'src/core/entities';
import { TagType } from 'src/core/object-types';
import { TagUseCases } from 'src/use-cases/tags/tag-use-cases';

@Resolver(() => TagType)
export class TagResolver {
  constructor(private tagUseCases: TagUseCases) {}

  @Query(() => [TagType], { name: 'tags' })
  getAllTag(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<ITag[]> {
    return this.tagUseCases.getAllTags({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => TagType, { name: 'tag' })
  getTagById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ITag> {
    return this.tagUseCases.getTagById(id);
  }

  @Mutation(() => TagType)
  createTag(
    @Args('createTagInput') createTagInput: CreateTagInput,
  ): Promise<ITag> {
    return this.tagUseCases.createTag(createTagInput);
  }

  @Mutation(() => TagType)
  updateTag(
    @Args('updateTagInput') updateTagInput: UpdateTagInput,
  ): Promise<ITag> {
    return this.tagUseCases.updateTag(updateTagInput.id, updateTagInput);
  }

  @Mutation(() => TagType)
  removeTag(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ITag> {
    return this.tagUseCases.removeTag(id);
  }
}
