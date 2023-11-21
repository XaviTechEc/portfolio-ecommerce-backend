import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ProductItemUseCases } from 'src/product-items/application/use-cases/product-item-use-cases';
import {
  CreateProductItemInput,
  UpdateProductItemInput,
} from 'src/product-items/domain/dtos/graphql/inputs/product-item.input';
import { ProductItemType } from 'src/product-items/interface-adapters/graphql/object-types/product-item.type';

@Resolver(() => ProductItemType)
export class ProductItemResolver extends BaseResolver(ProductItemType, {
  useCasesRef: ProductItemUseCases,
  createInputRef: CreateProductItemInput,
  updateInputRef: UpdateProductItemInput,
}) {
  constructor(private productItemUseCases: ProductItemUseCases) {
    super(productItemUseCases);
  }
}
