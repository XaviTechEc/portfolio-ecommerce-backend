import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './users/user-use-cases.module';
import { AddressesUseCaseModule } from './addresses/addresses-use-cases.module';
import { CartUseCasesModule } from './cart/cart-use-cases.module';
import { CategoriesUseCasesModule } from './categories/categories-use-cases.module';
import { CommentsUseCasesModule } from './comments/comments-use-cases.module';
import { PaymentsUseCasesModule } from './payments/payments-use-cases.module';
import { ProductsUseCasesModule } from './products/products-use-cases.module';
import { PromotionsUseCasesModule } from './promotions/promotions-use-cases.module';
import { ReviewsUseCasesModule } from './reviews/reviews-use-cases.module';
import { SeasonsUseCasesModule } from './seasons/seasons-use-cases.module';
import { TagsUseCasesModule } from './tags/tags-use-cases.module';
import { VariationsUseCasesModule } from './variations/variations-use-cases.module';

@Module({
  imports: [
    AddressesUseCaseModule,
    // CartUseCasesModule,
    // CategoriesUseCasesModule,
    // CommentsUseCasesModule,
    // PaymentsUseCasesModule,
    // ProductsUseCasesModule,
    // PromotionsUseCasesModule,
    // ReviewsUseCasesModule,
    // SeasonsUseCasesModule,
    // TagsUseCasesModule,
    // UserUseCasesModule,
    // VariationsUseCasesModule,
  ],
  exports: [
    AddressesUseCaseModule,
    // CartUseCasesModule,
    // CategoriesUseCasesModule,
    // CommentsUseCasesModule,
    // PaymentsUseCasesModule,
    // ProductsUseCasesModule,
    // PromotionsUseCasesModule,
    // ReviewsUseCasesModule,
    // SeasonsUseCasesModule,
    // TagsUseCasesModule,
    // UserUseCasesModule,
    // VariationsUseCasesModule,
  ],
})
export class UseCasesModule {}
