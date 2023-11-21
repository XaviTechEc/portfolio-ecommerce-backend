import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ProductCategoryUseCases } from 'src/product-categories/application/use-cases/product-category-use-cases';
import {
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from 'src/product-categories/domain/dtos/graphql/inputs/product-category.input';
import { ProductCategoryType } from 'src/product-categories/interface-adapters/graphql/object-types/product-category.type';

@Resolver(() => ProductCategoryType)
export class ProductCategoryResolver extends BaseResolver(ProductCategoryType, {
  useCasesRef: ProductCategoryUseCases,
  createInputRef: CreateProductCategoryInput,
  updateInputRef: UpdateProductCategoryInput,
}) {
  constructor(private productCategoryUseCases: ProductCategoryUseCases) {
    super(productCategoryUseCases);
  }
}
