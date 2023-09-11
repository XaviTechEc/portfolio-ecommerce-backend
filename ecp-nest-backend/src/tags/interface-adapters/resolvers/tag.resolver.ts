import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { TagUseCases } from 'src/tags/application/use-cases/tag-use-cases';
import {
  CreateTagInput,
  UpdateTagInput,
} from 'src/tags/domain/dtos/graphql/inputs/tag.input';
import { ITag } from 'src/tags/domain/entities/tag.entity';
import { TagType } from 'src/tags/domain/object-types/tag.type';

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
