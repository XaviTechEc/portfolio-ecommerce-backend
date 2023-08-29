import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShoppingCartProductItem } from './ShoppingCartProductItem.entity';
import { User } from './User.entity';

@Index('shopping_cart_pkey', ['id'], { unique: true })
@Entity('shopping_cart')
export class ShoppingCart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
