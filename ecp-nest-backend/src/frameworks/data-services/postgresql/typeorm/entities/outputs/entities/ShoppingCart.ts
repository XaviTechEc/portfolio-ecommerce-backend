import {
  Column,
  Entity,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ShoppingCartProductItem } from './ShoppingCartProductItem';
import { User } from './User';

@Index('shopping_cart_pkey', ['id'], { unique: true })
@Entity('shopping_cart', { schema: 'public' })
export class ShoppingCart {
  @Column('character varying', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.shoppingCart)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(
    () => ShoppingCartProductItem,
    (shoppingCartProductItem) => shoppingCartProductItem.shoppingCart,
  )
  shoppingCartProductItems: ShoppingCartProductItem[];
}
