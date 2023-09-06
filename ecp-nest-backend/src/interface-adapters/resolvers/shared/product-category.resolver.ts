import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from 'src/core/dtos';
import { IProductCategory } from 'src/core/entities';
import { ProductCategoryType } from 'src/core/object-types';
import { ProductCategoryUseCases } from 'src/use-cases';

@Resolver(() => ProductCategoryType)
export class ProductCategoryResolver {
  constructor(private productCategoryUseCases: ProductCategoryUseCases) {}

  @Query(() => [ProductCategoryType], { name: 'productCategories' })
  getAllProductCategory(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IProductCategory[]> {
    return this.productCategoryUseCases.getAllProductCategory({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => ProductCategoryType, { name: 'productCategory' })
  getProductCategoryById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProductCategory> {
    return this.productCategoryUseCases.getProductCategoryById(id);
  }

  @Mutation(() => ProductCategoryType)
  createProductCategory(
    @Args() createProductCategoryInput: CreateProductCategoryInput,
  ): Promise<IProductCategory> {
    return this.productCategoryUseCases.createProductCategory(
      createProductCategoryInput,
    );
  }

  @Mutation(() => ProductCategoryType)
  updateProductCategory(
    @Args() updateProductCategoryInput: UpdateProductCategoryInput,
  ): Promise<IProductCategory> {
    return this.productCategoryUseCases.updateProductCategory(
      updateProductCategoryInput.id,
      updateProductCategoryInput,
    );
  }

  @Mutation(() => ProductCategoryType)
  removeProductCategory(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProductCategory> {
    return this.productCategoryUseCases.removeProductCategory(id);
  }
}
