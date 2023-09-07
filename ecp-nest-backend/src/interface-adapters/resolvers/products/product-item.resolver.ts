import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateProductItemInput,
  UpdateProductItemInput,
} from 'src/core/dtos';
import { IProductItem } from 'src/core/entities';
import { ProductItemType } from 'src/core/object-types';
import { ProductItemUseCases } from 'src/use-cases';

@Resolver(() => ProductItemType)
export class ProductItemResolver {
  constructor(private productItemUseCases: ProductItemUseCases) {}

  @Query(() => [ProductItemType], { name: 'productItems' })
  getAllProductItems(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IProductItem[]> {
    return this.productItemUseCases.getAllProductItems({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ProductItemType], { name: 'productItemsByProduct' })
  getProductItemsByProduct(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IProductItem[]> {
    return this.productItemUseCases.getProductItemsBy(
      term,
      ['product'],
      paginationArgs,
    );
  }

  @Query(() => ProductItemType, { name: 'productItem' })
  getProductItemById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProductItem> {
    return this.productItemUseCases.getProductItemById(id);
  }

  @Mutation(() => ProductItemType)
  createProductItem(
    @Args('createProductItemInput')
    createProductItemInput: CreateProductItemInput,
  ): Promise<IProductItem> {
    return this.productItemUseCases.createProductItem(createProductItemInput);
  }

  @Mutation(() => ProductItemType)
  updateProductItem(
    @Args('updateProductItemInput')
    updateProductItemInput: UpdateProductItemInput,
  ): Promise<IProductItem> {
    return this.productItemUseCases.updateProductItem(
      updateProductItemInput.id,
      updateProductItemInput,
    );
  }

  @Mutation(() => ProductItemType)
  removeProductItem(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProductItem> {
    return this.productItemUseCases.removeProductItem(id);
  }
}
