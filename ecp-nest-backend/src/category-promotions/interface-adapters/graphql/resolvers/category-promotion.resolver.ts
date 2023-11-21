import { Resolver } from '@nestjs/graphql';
import { CategoryPromotionUseCases } from 'src/category-promotions/application/use-cases/category-promotion-use-cases';
import {
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/category-promotions/domain/dtos/graphql/inputs/category-promotion.input';
import { CategoryPromotionType } from 'src/category-promotions/interface-adapters/graphql/object-types/category-promotion.type';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';

@Resolver(() => CategoryPromotionType)
export class CategoryPromotionResolver extends BaseResolver(
  CategoryPromotionType,
  {
    useCasesRef: CategoryPromotionUseCases,
    createInputRef: CreateCategoryPromotionInput,
    updateInputRef: UpdateCategoryPromotionInput,
  },
) {
  constructor(private categoryPromotionUseCases: CategoryPromotionUseCases) {
    super(categoryPromotionUseCases);
  }
}
