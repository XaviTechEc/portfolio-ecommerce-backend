import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
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
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.userAddresses = new UserAddressesRepository(
      this.userAddressesRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
