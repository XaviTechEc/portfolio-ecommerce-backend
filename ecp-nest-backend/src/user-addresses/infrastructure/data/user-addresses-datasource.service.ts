import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { UserAddress } from './postgresql/entities/UserAddress.entity';
import { UserAddressesPostgresRepository } from './postgresql/repositories/user-addresses.repository';
import { IUserAddressesDataSourceService } from 'src/user-addresses/domain/abstracts/services/user-addresses-datasource.abstract.service';

@Injectable()
export class UserAddressesDataService
  implements IUserAddressesDataSourceService, OnApplicationBootstrap
{
  userAddresses: UserAddressesPostgresRepository<UserAddress>;
  constructor(
    @InjectRepository(UserAddress)
    private _repository: Repository<UserAddress>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.userAddresses = new UserAddressesPostgresRepository(
      this._repository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'user_address',
    );
  }
}
