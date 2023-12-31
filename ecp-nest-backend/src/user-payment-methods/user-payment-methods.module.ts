import { Module } from '@nestjs/common';
import { UserPaymentMethodFactoryService } from './application/use-cases/factory/user-payment-method-factory.service';
import { UserPaymentMethodUseCases } from './application/use-cases/user-payment-method-use-cases';
import { UserPaymentMethodsDataSourceModule } from './infrastructure/data/user-payment-methods-datasource.module';
import { UserPaymentMethodResolver } from './interface-adapters/graphql/resolvers/user-payment-method.entity.resolver';

@Module({
  imports: [UserPaymentMethodsDataSourceModule],
  providers: [
    UserPaymentMethodFactoryService,
    UserPaymentMethodUseCases,
    UserPaymentMethodResolver,
  ],
  exports: [UserPaymentMethodFactoryService, UserPaymentMethodUseCases],
})
export class UserPaymentMethodsModule {}
