import { IUserAddress } from '../../entities/user-address.entity';
import { IUserAddressRepository } from '../repositories/user-address.repository';

export abstract class IUserAddressesDataSourceService {
  abstract userAddresses: IUserAddressRepository<IUserAddress>;
}
