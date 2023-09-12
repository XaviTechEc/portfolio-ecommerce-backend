import { Module } from '@nestjs/common';
import { IUserPaymentMethodsDataSourceService } from 'src/user-payment-methods/domain/abstracts/services/user-payment-methods-datasource.abstract.service';
import { UserPaymentMethodsDataService } from './user-payment-methods-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPaymentMethod } from './postgresql/entities/UserPaymentMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPaymentMethod])],
  providers: [
    {
      provide: IUserPaymentMethodsDataSourceService,
      useClass: UserPaymentMethodsDataService,
    },
  ],
  exports: [IUserPaymentMethodsDataSourceService, TypeOrmModule],
})
export class UserPaymentMethodsDataSourceModule {}
