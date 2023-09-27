import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { UserAddress } from './postgresql/entities/UserAddress.entity';
import { UserAddressesRepository } from './postgresql/repositories/user-address.repository';
import { IUserAddressesDataSourceService } from 'src/user-addresses/domain/abstracts/services/user-addresses-datasource.abstract.service';

@Injectable()
export class UserAddressesDataService
  implements IUserAddressesDataSourceService, OnApplicationBootstrap
{
  userAddresses: UserAddressesRepository;
  constructor(
    @InjectRepository(UserAddress)
    private userAddressesRepository: Repository<UserAddress>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.userAddresses = new UserAddressesRepository(
      this.userAddressesRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
