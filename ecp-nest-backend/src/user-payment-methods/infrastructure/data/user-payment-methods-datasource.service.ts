import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IUserPaymentMethodsDataSourceService } from 'src/user-payment-methods/domain/abstracts/services/user-payment-methods-datasource.abstract.service';
import { Repository } from 'typeorm';
import { UserPaymentMethod } from './postgresql/entities/UserPaymentMethod.entity';
import { UserPaymentMethodsPostgresRepository } from './postgresql/repositories/user-payment-methods.repository';

@Injectable()
export class UserPaymentMethodsDataService
  implements IUserPaymentMethodsDataSourceService, OnApplicationBootstrap
{
  userPaymentMethods: UserPaymentMethodsPostgresRepository<UserPaymentMethod>;

  constructor(
    @InjectRepository(UserPaymentMethod)
    private _repository: Repository<UserPaymentMethod>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.userPaymentMethods =
      new UserPaymentMethodsPostgresRepository<UserPaymentMethod>(
        this._repository,
        this._loggerService,
        this._exceptionsService,
        this.constructor.name,
        'userPaymentMethod',
      );
  }
}
