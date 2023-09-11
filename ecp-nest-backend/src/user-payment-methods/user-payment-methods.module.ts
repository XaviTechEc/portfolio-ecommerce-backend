import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPaymentMethod } from './infrastructure/data/postgresql/entities/UserPaymentMethod.entity';
import { UserPaymentMethodFactoryService } from './application/use-cases/factory/user-payment-method-factory.service';
import { UserPaymentMethodUseCases } from './application/use-cases/user-payment-method-use-cases';
import { UserPaymentMethodResolver } from './interface-adapters/resolvers/user-payment-method.entity.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserPaymentMethod])],
  providers: [
    UserPaymentMethodFactoryService,
    UserPaymentMethodUseCases,
    UserPaymentMethodResolver,
  ],
  exports: [TypeOrmModule],
})
export class UserPaymentMethodsModule {}
