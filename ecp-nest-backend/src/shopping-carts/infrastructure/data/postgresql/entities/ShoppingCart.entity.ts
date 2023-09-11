import { ShoppingCartProductItem } from 'src/shopping-cart-product-items/infrastructure/data/postgresql/entities/ShoppingCartProductItem.entity';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Index('shopping_cart_pkey', ['id'], { unique: true })
@Entity('shopping_cart')
export class ShoppingCart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

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
