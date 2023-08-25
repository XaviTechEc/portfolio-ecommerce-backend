import { CreateShopOrderInput, UpdateShopOrderInput } from 'src/core/dtos';
import { IShopOrder } from 'src/core/entities';

export abstract class IShopOrdersRepository {
  abstract getAllShopOrders(): Promise<IShopOrder[]>;
  abstract getAllShopOrdersBy(
    fields: Partial<IShopOrder>,
  ): Promise<IShopOrder[]>;

  abstract getShopOrderById(id: string): Promise<IShopOrder>;
  abstract getOneShopOrderBy(fields: Partial<IShopOrder>): Promise<IShopOrder>;
  abstract createShopOrder(
    createShopOrderInput: CreateShopOrderInput,
  ): Promise<IShopOrder>;
  abstract updateShopOrder(
    id: string,
    updateShopOrderInput: UpdateShopOrderInput,
  ): Promise<IShopOrder>;
  abstract removeShopOrder(id: string): Promise<IShopOrder>;
}
