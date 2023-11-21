import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/domain/dtos/graphql/args';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ImageUseCases } from 'src/images/application/use-cases/image-use-cases';
import {
  CreateImageInput,
  UpdateImageInput,
} from 'src/images/domain/dtos/graphql/inputs/image.input';
import { ImageType } from 'src/images/interface-adapters/graphql/object-types/image.type';

@Resolver(() => ImageType)
export class ImageResolver extends BaseResolver(ImageType, {
  useCasesRef: ImageUseCases,
  createInputRef: CreateImageInput,
  updateInputRef: UpdateImageInput,
}) {
  constructor(private imageUseCases: ImageUseCases) {
    super(imageUseCases);
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
}
