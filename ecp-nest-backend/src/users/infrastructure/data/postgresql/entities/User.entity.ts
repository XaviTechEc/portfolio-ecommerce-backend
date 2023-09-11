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
import { UserAddress } from './UserAddress.entity';
import { Review } from './Review.entity';
import { ShoppingCart } from './ShoppingCart.entity';
import { ShopOrder } from './ShopOrder.entity';
import { Comment } from './Comment.entity';

import { Product } from './Product.entity';
import { UserType, Role, Gender } from 'src/core/enums';
import { Category } from './Category.entity';
import { UserPaymentMethod } from './UserPaymentMethod.entity';
import { Image } from './Image.entity';

@Index('user_pkey', ['id'], { unique: true })
@Index('user_id_user_username_idx', ['id', 'username'], { unique: true })
@Index('user_username_idx', ['username'], { unique: true })
@Index('user_email_idx', ['email'], {})
@Entity('user')
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
  phoneNumber?: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.EMAIL,
    name: 'user_type',
  })
  userType: UserType;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
    name: 'role',
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: Gender,
    name: 'gender',
    nullable: true,
  })
  gender?: Gender;

  @Column('character varying', { name: 'avatar_img', nullable: true })
  avatarImg?: string;

  @Column('boolean', { name: 'active', default: true })
  active?: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;

  @Column('timestamptz', {
    name: 'last_connection',
    nullable: true,
  })
  lastConnection?: Date;

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

  @OneToMany(() => Category, (category) => category.user)
  category: Category[];

  @OneToMany(() => Image, (image) => image.product)
  image: Image[];

  @BeforeInsert()
  checkFields() {
    this.email = this.email.toLowerCase();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFields();
  }
}