import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ProductCategoryUseCases } from 'src/product-categories/application/use-cases/product-category-use-cases';
import {
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from 'src/product-categories/domain/dtos/graphql/inputs/product-category.input';
import { IProductCategory } from 'src/product-categories/domain/entities/product-category.entity';
import { ProductCategoryType } from 'src/product-categories/domain/object-types/product-category.type';

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

  @Query(() => [ProductCategoryType], { name: 'productCategoriesByCategory' })
  getProductCategoryByCategory(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IProductCategory[]> {
    return this.productCategoryUseCases.getProductCategoriesBy(
      term,
      ['category'],
      paginationArgs,
    );
  }

  @Query(() => [ProductCategoryType], { name: 'productCategoriesByProduct' })
  getProductCategoryByProduct(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IProductCategory[]> {
    return this.productCategoryUseCases.getProductCategoriesBy(
      term,
      ['product'],
      paginationArgs,
    );
  }

  @Query(() => ProductCategoryType, { name: 'productCategory' })
  getProductCategoryById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProductCategory> {
    return this.productCategoryUseCases.getProductCategoryById(id);
  }

  @Mutation(() => ProductCategoryType)
  createProductCategory(
    @Args('createProductCategoryInput')
    createProductCategoryInput: CreateProductCategoryInput,
  ): Promise<IProductCategory> {
    return this.productCategoryUseCases.createProductCategory(
      createProductCategoryInput,
    );
  }

  @Mutation(() => ProductCategoryType)
  updateProductCategory(
    @Args('updateProductCategoryInput')
    updateProductCategoryInput: UpdateProductCategoryInput,
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
