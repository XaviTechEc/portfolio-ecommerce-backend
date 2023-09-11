import { OnApplicationBootstrap } from '@nestjs/common';
import { PaymentMethod } from './postgresql/entities/PaymentMethod.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethodsRepository } from './postgresql/repositories/payment-methods.repository';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';

export class PaymentMethodsDataService implements OnApplicationBootstrap {
  paymentMethods: PaymentMethodsRepository;

  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodsRepository: Repository<PaymentMethod>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.paymentMethods = new PaymentMethodsRepository(
      this.paymentMethodsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
