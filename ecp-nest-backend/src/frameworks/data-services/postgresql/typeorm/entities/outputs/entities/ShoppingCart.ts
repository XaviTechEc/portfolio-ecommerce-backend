import {
  Column,
  Entity,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShoppingCartProductItem } from './ShoppingCartProductItem';
import { User } from './User';

@Index('shopping_cart_pkey', ['id'], { unique: true })
@Entity('shopping_cart', { schema: 'public' })
export class ShoppingCart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'user_id' })
  userId: string;

  // Relations
  @OneToMany(
    () => ShoppingCartProductItem,
    (shoppingCartProductItem) => shoppingCartProductItem.shoppingCart,
  )
  shoppingCartProductItem: ShoppingCartProductItem[];

  @ManyToOne(() => User, (user) => user.shoppingCart)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
