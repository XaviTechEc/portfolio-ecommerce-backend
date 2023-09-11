import { ParseUUIDPipe } from '@nestjs/common';
import {
  Resolver,
  Args,
  ID,
  Mutation,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateProductInput,
  UpdateProductInput,
} from 'src/core/dtos';
import { IProduct } from 'src/core/entities';
import { ProductType, PromotionType, TagType } from 'src/core/object-types';
import {
  ProductPromotionUseCases,
  ProductTagUseCases,
  ProductUseCases,
} from 'src/use-cases';

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
  ): Promise<IProduct[]> {
    return this.productUseCases.getAllProducts({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ProductType], { name: 'productsByUser' })
  getProductsByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IProduct[]> {
    return this.productUseCases.getProductsBy(term, ['user'], paginationArgs);
  }

  @Query(() => ProductType, { name: 'product' })
  getProductById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProduct> {
    return this.productUseCases.getProductById(id);
  }

  @Mutation(() => ProductType)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<IProduct> {
    return this.productUseCases.createProduct(createProductInput);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<IProduct> {
    return this.productUseCases.updateProduct(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => ProductType)
  removeProduct(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProduct> {
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
