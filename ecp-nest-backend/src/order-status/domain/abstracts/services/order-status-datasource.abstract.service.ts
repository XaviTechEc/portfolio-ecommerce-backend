import { IOrderStatus } from '../../entities/order-status.entity';
import { IOrderStatusRepository } from '../repositories/order-status.repository';

export abstract class IOrderStatusDataSourceService {
  abstract orderStatus: IOrderStatusRepository<IOrderStatus>;
}
