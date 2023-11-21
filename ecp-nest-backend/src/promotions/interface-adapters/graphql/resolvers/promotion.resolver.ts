import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { PromotionUseCases } from 'src/promotions/application/use-cases/promotion-use-cases';
import {
  CreatePromotionInput,
  UpdatePromotionInput,
} from 'src/promotions/domain/dtos/graphql/inputs/promotion.input';
import { PromotionType } from 'src/promotions/interface-adapters/graphql/object-types/promotion.type';

@Resolver(() => PromotionType)
export class PromotionResolver extends BaseResolver(PromotionType, {
  useCasesRef: PromotionUseCases,
  createInputRef: CreatePromotionInput,
  updateInputRef: UpdatePromotionInput,
}) {
  constructor(private promotionUseCases: PromotionUseCases) {
    super(promotionUseCases);
  }
}
