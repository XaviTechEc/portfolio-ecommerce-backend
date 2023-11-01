import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ProductTagUseCases } from 'src/product-tags/application/use-cases/product-tag-use-cases';
import {
  CreateProductTagInput,
  UpdateProductTagInput,
} from 'src/product-tags/domain/dtos/graphql/inputs/product-tag.input';
import { ProductTagType } from 'src/product-tags/domain/object-types/product-tag.type';

@Resolver(() => ProductTagType)
export class ProductTagResolver {
  constructor(private productTagUseCases: ProductTagUseCases) {}

  @Query(() => [ProductTagType], { name: 'productTags' })
  getAllProductTag(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.productTagUseCases.getAllProductTag({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ProductTagType], { name: 'productTagsByProduct' })
  getProductTagsByProduct(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.productTagUseCases.getProductTagsBy(
      term,
      ['product'],
      paginationArgs,
    );
  }

  @Query(() => [ProductTagType], { name: 'productTagsByTag' })
  getProductTagsByTag(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.productTagUseCases.getProductTagsBy(
      term,
      ['tag'],
      paginationArgs,
    );
  }

  @Query(() => ProductTagType, { name: 'productTag' })
  getProductTagById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.productTagUseCases.getProductTagById(id);
  }

  @Mutation(() => ProductTagType)
  createProductTag(
    @Args('createProductTagInput') createProductTagInput: CreateProductTagInput,
  ) {
    return this.productTagUseCases.createProductTag(createProductTagInput);
  }

  @Mutation(() => ProductTagType)
  updateProductTag(
    @Args('updateProductTagInput') updateProductTagInput: UpdateProductTagInput,
  ) {
    return this.productTagUseCases.updateProductTag(
      updateProductTagInput.id,
      updateProductTagInput,
    );
  }

  @Mutation(() => ProductTagType)
  removeProductTag(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.productTagUseCases.removeProductTag(id);
  }
}
