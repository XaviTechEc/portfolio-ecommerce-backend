import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ShopOrder } from 'src/shop-orders/infrastructure/data/postgresql/entities/ShopOrder.entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Index('shipping_method_pkey', ['id'], { unique: true })
@Entity('shipping_method')
export class ShippingMethod extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('real', { name: 'price', default: 0 })
  price: number;

  // Relations
  @OneToMany(() => ShopOrder, (shopOrder) => shopOrder.shippingMethod)
  shopOrder: ShopOrder[];
}
