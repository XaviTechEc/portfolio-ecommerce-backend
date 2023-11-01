import { ParseUUIDPipe } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ProductPromotionUseCases } from 'src/product-promotions/application/use-cases/product-promotion-use-cases';
import { ProductTagUseCases } from 'src/product-tags/application/use-cases/product-tag-use-cases';
import { ProductUseCases } from 'src/products/application/use-cases/product-use-cases';
import {
  CreateProductInput,
  UpdateProductInput,
} from 'src/products/domain/dtos/graphql/inputs/product.input';
import { ProductType } from 'src/products/domain/object-types/product.type';
import { PromotionType } from 'src/promotions/domain/object-types/promotion.type';
import { TagType } from 'src/tags/domain/object-types/tag.type';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(
    private productUseCases: ProductUseCases,
    private productTagUseCases: ProductTagUseCases,
    private productPromotionUseCases: ProductPromotionUseCases,
  ) {}

  @Query(() => [ProductType], { name: 'products' })
  getAllProduct(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.productUseCases.getAllProducts({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ProductType], { name: 'productsByUser' })
  getProductsByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.productUseCases.getProductsBy(term, ['user'], paginationArgs);
  }

  @Query(() => ProductType, { name: 'product' })
  getProductById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.productUseCases.getProductById(id);
  }

  @Mutation(() => ProductType)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productUseCases.createProduct(createProductInput);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productUseCases.updateProduct(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => ProductType)
  removeProduct(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.productUseCases.removeProduct(id);
  }

  // === Resolve Fields ===
  @ResolveField(() => [TagType], { name: 'tags' })
  getAllTags(
    @Parent() product: ProductType,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.productTagUseCases.getProductTagsBy(
      product.id,
      ['product'],
      paginationArgs,
    );
  }

  @ResolveField(() => [PromotionType], { name: 'promotions' })
  getAllPromotions(
    @Parent() product: ProductType,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.productPromotionUseCases.getProductPromotionsBy(
      product.id,
      ['product'],
      paginationArgs,
    );
  }
}
