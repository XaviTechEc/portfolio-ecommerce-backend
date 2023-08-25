import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './users/user-use-cases.module';
import { AddressesUseCaseModule } from './addresses/addresses-use-cases.module';
import { CartUseCasesModule } from './cart/cart-use-cases.module';
import { CategoriesUseCasesModule } from './categories/categories-use-cases.module';
import { CommentsUseCasesModule } from './comments/comments-use-cases.module';
import { PaymentsUseCasesModule } from './payments/payments-use-cases.module';
import { ProductsUseCasesModule } from './products/products-use-cases.module';
import { PromotionsUseCasesModule } from './promotions/promotions-use-cases.module';

@Module({
  imports: [
    UserUseCasesModule,
    AddressesUseCaseModule,
    CartUseCasesModule,
    CategoriesUseCasesModule,
    CommentsUseCasesModule,
    PaymentsUseCasesModule,
    ProductsUseCasesModule,
    PromotionsUseCasesModule,
  ],
  exports: [
    UserUseCasesModule,
    AddressesUseCaseModule,
    CartUseCasesModule,
    CategoriesUseCasesModule,
    CommentsUseCasesModule,
    PaymentsUseCasesModule,
    ProductsUseCasesModule,
    PromotionsUseCasesModule,
  ],
})
export class UseCasesModule {}
