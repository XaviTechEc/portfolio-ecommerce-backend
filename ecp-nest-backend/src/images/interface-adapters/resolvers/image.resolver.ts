import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ImageUseCases } from 'src/images/application/use-cases/image-use-cases';
import { ImageType } from 'src/images/domain/object-types/image.type';

@Resolver(() => ImageType)
export class ImageResolver {
  constructor(private imageUseCases: ImageUseCases) {}

  @Query(() => [ImageType], { name: 'images' })
  getAllImages(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.imageUseCases.getAllImages({ paginationArgs, searchArgs });
  }

  @Query(() => [ImageType], { name: 'imagesByProduct' })
  getImagesByProduct(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.imageUseCases.getImagesBy(term, ['product'], paginationArgs);
  }

  @Query(() => [ImageType], { name: 'imagesByProductItem' })
  getImagesByProductItem(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.imageUseCases.getImagesBy(
      term,
      ['productItem'],
      paginationArgs,
    );
  }

  @Query(() => [ImageType], { name: 'imagesByCategory' })
  getImagesByCategory(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.imageUseCases.getImagesBy(term, ['category'], paginationArgs);
  }

  @Query(() => [ImageType], { name: 'imagesByUser' })
  getImagesByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.imageUseCases.getImagesBy(term, ['user'], paginationArgs);
  }

  @Query(() => ImageType, { name: 'image' })
  getImageById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.imageUseCases.getImageById(id);
  }
}
