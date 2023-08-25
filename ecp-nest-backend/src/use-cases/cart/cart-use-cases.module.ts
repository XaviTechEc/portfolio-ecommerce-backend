import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import {
  OrderLineFactoryService,
  OrderStatusFactoryService,
  ShippingMethodFactoryService,
  ShopOrderFactoryService,
  ShoppingCartFactoryService,
} from './factory';
import { OrderLineUseCases } from './order-line-use-cases';
import { OrderStatusUseCases } from './order-status-use-cases';
import { ShippingMethodUseCases } from './shipping-method-use-cases';
import { ShopOrderUseCases } from './shop-order-use-cases';
import { ShoppingCartUseCases } from './shopping-cart-use-cases';

@Module({
  imports: [DataServicesModule],
  exports: [
    OrderLineFactoryService,
    OrderStatusFactoryService,
    ShippingMethodFactoryService,
    ShopOrderFactoryService,
    ShoppingCartFactoryService,
    OrderLineUseCases,
    OrderStatusUseCases,
    ShippingMethodUseCases,
    ShopOrderUseCases,
    ShoppingCartUseCases,
  ],
  providers: [
    OrderLineFactoryService,
    OrderStatusFactoryService,
    ShippingMethodFactoryService,
    ShopOrderFactoryService,
    ShoppingCartFactoryService,
    OrderLineUseCases,
    OrderStatusUseCases,
    ShippingMethodUseCases,
    ShopOrderUseCases,
    ShoppingCartUseCases,
  ],
})
export class CartUseCasesModule {}
