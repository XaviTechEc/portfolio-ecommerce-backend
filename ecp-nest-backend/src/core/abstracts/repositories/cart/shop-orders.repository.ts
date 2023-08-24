import { IShopOrder } from 'src/core/entities';

export abstract class IShopOrdersRepository {
  abstract getAllShopOrders(): Promise<IShopOrder[]>;
  abstract getAllShopOrdersBy(
    fields: Partial<IShopOrder>,
  ): Promise<IShopOrder[]>;

  abstract getShopOrderById(id: string): Promise<IShopOrder>;
  abstract getOneShopOrderBy(fields: Partial<IShopOrder>): Promise<IShopOrder>;
  abstract createShopOrder(createShopOrderInput: any): Promise<IShopOrder>;
  abstract updateShopOrder(updateShopOrderInput: any): Promise<IShopOrder>;
  abstract removeShopOrder(id: string): Promise<IShopOrder>;
}
