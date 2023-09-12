import { Module } from '@nestjs/common';
import { IPaymentMethodsDataSourceService } from 'src/payment-methods/domain/abstracts/services/payment-methods-datasource.abstract.service';
import { PaymentMethodsDataService } from './payment-methods-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from './postgresql/entities/PaymentMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  providers: [
    {
      provide: IPaymentMethodsDataSourceService,
      useClass: PaymentMethodsDataService,
    },
  ],
  exports: [IPaymentMethodsDataSourceService, TypeOrmModule],
})
export class PaymentMethodsDataSourceModule {}
