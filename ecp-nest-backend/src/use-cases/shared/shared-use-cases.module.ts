import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import {
  CategoryPromotionFactoryService,
  ProductCategoryFactoryService,
  ProductConfigurationFactoryService,
  ProductPromotionFactoryService,
  ProductTagFactoryService,
  ShopOrderLocationFactoryService,
  ShoppingCartProductItemFactoryService,
  UserAddressFactoryService,
} from './factory';

import {
  CategoryPromotionUseCases,
  ProductCategoryUseCases,
  ProductConfigurationUseCases,
  ProductPromotionUseCases,
  ProductTagUseCases,
  ShopOrderLocationUseCases,
  ShoppingCartProductItemUseCases,
  UserAddressUseCases,
} from './use-case';

@Module({
  imports: [DataServicesModule],
  exports: [
    CategoryPromotionFactoryService,
    ProductCategoryFactoryService,
    ProductConfigurationFactoryService,
    ProductPromotionFactoryService,
    ProductTagFactoryService,
    ShopOrderLocationFactoryService,
    ShoppingCartProductItemFactoryService,
    UserAddressFactoryService,
    CategoryPromotionUseCases,
    ProductCategoryUseCases,
    ProductConfigurationUseCases,
    ProductPromotionUseCases,
    ProductTagUseCases,
    ShopOrderLocationUseCases,
    ShoppingCartProductItemUseCases,
    UserAddressUseCases,
  ],
  providers: [
    CategoryPromotionFactoryService,
    ProductCategoryFactoryService,
    ProductConfigurationFactoryService,
    ProductPromotionFactoryService,
    ProductTagFactoryService,
    ShopOrderLocationFactoryService,
    ShoppingCartProductItemFactoryService,
    UserAddressFactoryService,
    CategoryPromotionUseCases,
    ProductCategoryUseCases,
    ProductConfigurationUseCases,
    ProductPromotionUseCases,
    ProductTagUseCases,
    ShopOrderLocationUseCases,
    ShoppingCartProductItemUseCases,
    UserAddressUseCases,
  ],
})
export class SharedUseCasesModule {}
