import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ProductPromotionUseCases } from 'src/product-promotions/application/use-cases/product-promotion-use-cases';
import {
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
} from 'src/product-promotions/domain/dtos/graphql/inputs/product-promotion.input';
import { ProductPromotionType } from 'src/product-promotions/interface-adapters/graphql/object-types/product-promotion.type';

@Resolver(() => ProductPromotionType)
export class ProductPromotionResolver extends BaseResolver(
  ProductPromotionType,
  {
    useCasesRef: ProductPromotionUseCases,
    createInputRef: CreateProductPromotionInput,
    updateInputRef: UpdateProductPromotionInput,
  },
) {
  constructor(private productPromotionUseCases: ProductPromotionUseCases) {
    super(productPromotionUseCases);
  }
}
