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
import { CategoryUseCases } from 'src/categories/application/use-cases/category-use-cases';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from 'src/categories/domain/dtos/graphql/inputs/category.input';
import { CategoryType } from 'src/categories/domain/object-types/category.type';
import { CategoryPromotionUseCases } from 'src/category-promotions/application/use-cases/category-promotion-use-cases';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ProductCategoryUseCases } from 'src/product-categories/application/use-cases/product-category-use-cases';
import { ProductType } from 'src/products/domain/object-types/product.type';
import { PromotionType } from 'src/promotions/domain/object-types/promotion.type';

@Resolver(() => CategoryType)
export class CategoryResolver {
  constructor(
    private categoryUseCases: CategoryUseCases,
    private productCategoryUseCases: ProductCategoryUseCases,
    private categoryPromotionUseCases: CategoryPromotionUseCases,
  ) {}

  @Query(() => [CategoryType], { name: 'categories' })
  getAllCategories(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.categoryUseCases.getAllCategories({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [CategoryType], { name: 'categoriesBySeason' })
  getCategoriesBySeason(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.categoryUseCases.getCategoriesBy(
      term,
      ['season'],
      paginationArgs,
    );
  }

  @Query(() => [CategoryType], { name: 'categoriesByUser' })
  getCategoriesByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.categoryUseCases.getCategoriesBy(
      term,
      ['user'],
      paginationArgs,
    );
  }

  @Query(() => [CategoryType], { name: 'categoriesByParentCategory' })
  getCategoriesByParentCategory(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.categoryUseCases.getCategoriesBy(
      term,
      ['parentCategory'],
      paginationArgs,
    );
  }

  @Query(() => CategoryType, { name: 'category' })
  getCategoryById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.categoryUseCases.getCategoryById(id);
  }

  @Mutation(() => CategoryType)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryUseCases.createCategory(createCategoryInput);
  }

  @Mutation(() => CategoryType)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryUseCases.updateCategory(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => CategoryType)
  removeCategory(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.categoryUseCases.removeCategory(id);
  }

  // === Resolve Fields ===
  @ResolveField(() => [ProductType], { name: 'products' })
  getAllProducts(
    @Parent() category: CategoryType,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.productCategoryUseCases.getProductCategoriesBy(
      category.id,
      ['category'],
      paginationArgs,
    );
  }

  @ResolveField(() => [PromotionType], { name: 'promotions' })
  getAllPromotions(
    @Parent() category: CategoryType,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.categoryPromotionUseCases.getCategoryPromotionBy(
      category.id,
      ['category'],
      paginationArgs,
    );
  }
}
