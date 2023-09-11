import { IOrderLine } from '../../entities/order-line.entity';
import { IOrderLinesRepository } from '../repositories/order-lines.repository';

export abstract class IOrderLinesDataSourceService {
  abstract orderLines: IOrderLinesRepository<IOrderLine>;
}
