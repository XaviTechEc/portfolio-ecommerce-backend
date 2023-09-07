import {
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShoppingCartProductItem } from './ShoppingCartProductItem.entity';
import { User } from './User.entity';

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
