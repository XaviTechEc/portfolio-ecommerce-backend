import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PaymentMethod } from './postgresql/entities/PaymentMethod.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethodsPostgresRepository } from './postgresql/repositories/payment-methods.repository';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IPaymentMethodsDataSourceService } from 'src/payment-methods/domain/abstracts/services/payment-methods-datasource.abstract.service';

@Injectable()
export class PaymentMethodsDataService
  implements IPaymentMethodsDataSourceService, OnApplicationBootstrap
{
  paymentMethods: PaymentMethodsPostgresRepository<PaymentMethod>;

  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodsPostgresRepository: Repository<PaymentMethod>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.paymentMethods = new PaymentMethodsPostgresRepository(
      this.paymentMethodsPostgresRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'payment_method',
    );
  }
}
