import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAddress } from './UserAddress';
import { Review } from './Review';
import { ShoppingCart } from './ShoppingCart';
import { ShopOrder } from './ShopOrder';
import { Comment } from './Comment';
import { UserPaymentMethod } from './UserPaymentMethod';
import { ProductImage } from './ProductImage';
import { Product } from './Product';
import { UserType, Role, Gender } from 'src/core/enums';
import { Category } from './Category';

@Index('user_pkey', ['id'], { unique: true })
@Index('user_id_user_username_idx', ['id', 'username'], { unique: true })
@Index('user_email_idx', ['username'], {})
@Index('user_email_idx', ['email'], {})
@Entity('user', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'username', unique: true })
  username: string;

  @Column('character varying', { name: 'email', unique: true })
  email: string;

  @Column('character varying', { name: 'password' })
  password: string;

  @Column('character varying', { name: 'full_name' })
  fullName: string;

  @Column('character varying', { name: 'phone_number', nullable: true })
  phoneNumber: string | null;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.email,
    name: 'user_type',
  })
  userType: UserType;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.client,
    name: 'role',
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: Gender,
    name: 'role',
    nullable: true,
  })
  gender: Gender | null;

  @Column('character varying', { name: 'avatar_img', nullable: true })
  avatarImg: string | null;

  @Column('boolean', { name: 'active', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date | null;

  @Column('timestamptz', {
    name: 'last_connection',
    nullable: true,
  })
  lastConnection: Date | null;

  // Relations
  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  userAddress: UserAddress[];

  @OneToMany(() => ShoppingCart, (shoppingCart) => shoppingCart.user)
  shoppingCart: ShoppingCart[];

  @OneToMany(() => ShopOrder, (shopOrder) => shopOrder.user)
  shopOrder: ShopOrder[];

  @OneToMany(() => Review, (review) => review.user)
  review: Review[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(
    () => UserPaymentMethod,
    (userPaymentMethod) => userPaymentMethod.user,
  )
  userPaymentMethod: UserPaymentMethod[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product[];

  @OneToMany(() => ProductImage, (productImage) => productImage.user)
  productImage: ProductImage[];

  @OneToMany(() => Category, (category) => category.user)
  category: Category;

  @BeforeInsert()
  checkFields() {
    this.email = this.email.toLowerCase();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFields();
  }
}
