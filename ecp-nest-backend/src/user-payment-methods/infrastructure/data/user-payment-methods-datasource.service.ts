import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { UserPaymentMethod } from './postgresql/entities/UserPaymentMethod.entity';
import { UserPaymentMethodsRepository } from './postgresql/repositories/user-payment-methods.repository';
import { IUserPaymentMethodsDataSourceService } from 'src/user-payment-methods/domain/abstracts/services/user-payment-methods-datasource.abstract.service';

@Injectable()
export class UserPaymentMethodsDataService
  implements IUserPaymentMethodsDataSourceService, OnApplicationBootstrap
{
  userPaymentMethods: UserPaymentMethodsRepository;

  constructor(
    @InjectRepository(UserPaymentMethod)
    private userPaymentMethodsRepository: Repository<UserPaymentMethod>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.userPaymentMethods = new UserPaymentMethodsRepository(
      this.userPaymentMethodsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
