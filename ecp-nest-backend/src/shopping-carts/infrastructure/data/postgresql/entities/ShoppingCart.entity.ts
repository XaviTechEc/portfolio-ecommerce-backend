import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ShoppingCartProductItem } from 'src/shopping-cart-product-items/infrastructure/data/postgresql/entities/ShoppingCartProductItem.entity';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('shopping_cart_pkey', ['id'], { unique: true })
@Entity('shopping_cart')
export class ShoppingCart extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relations
  @OneToMany(
    () => ShoppingCartProductItem,
    (shoppingCartProductItem) => shoppingCartProductItem.shoppingCart,
  )
  shoppingCartProductItem: ShoppingCartProductItem[];

  @ManyToOne(() => User, (user) => user.shoppingCarts)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
