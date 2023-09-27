import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PaymentMethod } from './postgresql/entities/PaymentMethod.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethodsRepository } from './postgresql/repositories/payment-methods.repository';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IPaymentMethodsDataSourceService } from 'src/payment-methods/domain/abstracts/services/payment-methods-datasource.abstract.service';

@Injectable()
export class PaymentMethodsDataService
  implements IPaymentMethodsDataSourceService, OnApplicationBootstrap
{
  paymentMethods: PaymentMethodsRepository;

  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodsRepository: Repository<PaymentMethod>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.paymentMethods = new PaymentMethodsRepository(
      this.paymentMethodsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
