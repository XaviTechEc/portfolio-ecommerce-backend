import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { UserAddress } from './UserAddress';
import { Review } from './Review';
import { ShoppingCart } from './ShoppingCart';
import { ShopOrder } from './ShopOrder';
import { Comment } from './Comment';
import { UserPaymentMethod } from './UserPaymentMethod';
import { ProductImage } from './ProductImage';
/*
  enum role { 
  admin
  client 
  super_admin
}

enum gender { 
  male
  female
  other
}

enum user_type { 
  google
  email
}

Table user { 
  id varchar [pk, not null]
  username varchar [not null, unique]
  email varchar [not null, unique]
  password varchar [not null]
  full_name varchar [not null]
  phone_number varchar [not null, unique]
  user_type user_type [default: 'email']
  role role [default: 'client']
  gender gender
  avatar_img varchar
  active boolean [default: true]
  created_at timestamp [default: 'now()']
  updated_at timestamp
  last_connection timestamp [default: 'now()']

  indexes { 
    (id, username) [pk]
    (email)[unique]
  }
}

*/

export enum UserType {
  email,
  google,
}

export enum Role {
  admin,
  client,
  super_admin,
}

export enum Gender {
  male,
  female,
  other,
}

@Index('user_pkey', ['id'], { unique: true })
@Index('user_id_user_username_idx', ['id', 'username'], { unique: true })
@Index('user_email_idx', ['email'], {})
@Entity('user', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'username' })
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
  })
  gender: Gender;

  @Column('character varying', { name: 'avatar_img', nullable: true })
  avatarImg: string | null;

  @Column('boolean', { name: 'active', default: true })
  active: boolean;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => Date.now(),
  })
  createdAt: Date | null;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
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
  userPaymentMethod: UserPaymentMethod;

  @OneToMany(() => ProductImage, (productImage) => productImage.user)
  productImage: ProductImage;
}
