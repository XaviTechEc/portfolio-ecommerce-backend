import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import {
  PaymentMethodFactoryService,
  UserPaymentMethodFactoryService,
} from './factory';
import { PaymentMethodUseCases } from './payment-method-use-cases';
import { UserPaymentMethodUseCases } from './user-payment-method-use-cases';

@Module({
  imports: [DataServicesModule],
  exports: [
    PaymentMethodFactoryService,
    UserPaymentMethodFactoryService,
    PaymentMethodUseCases,
    UserPaymentMethodUseCases,
  ],
  providers: [
    PaymentMethodFactoryService,
    UserPaymentMethodFactoryService,
    PaymentMethodUseCases,
    UserPaymentMethodUseCases,
  ],
})
export class PaymentsUseCasesModule {}
