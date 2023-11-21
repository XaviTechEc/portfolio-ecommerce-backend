import { IUserAddress } from '../../entities/user-address.entity';
import { IUserAddressesRepository } from '../repositories/user-addresses.repository';

export abstract class IUserAddressesDataSourceService {
  abstract userAddresses: IUserAddressesRepository<IUserAddress>;
}
