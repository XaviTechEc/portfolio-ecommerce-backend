import { Comment } from 'src/comments/infrastructure/data/postgresql/entities/Comment.entity';
import { IGenericAdditionalPropsWithTimeStamptz } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { Review } from 'src/reviews/infrastructure/data/postgresql/entities/Review.entity';
import { Role } from 'src/roles/infrastructure/data/postgresql/entities/Role.entity';
import { ShopOrder } from 'src/shop-orders/infrastructure/data/postgresql/entities/ShopOrder.entity';
import { ShoppingCart } from 'src/shopping-carts/infrastructure/data/postgresql/entities/ShoppingCart.entity';
import { UserAddress } from 'src/user-addresses/infrastructure/data/postgresql/entities/UserAddress.entity';
import { UserPaymentMethod } from 'src/user-payment-methods/infrastructure/data/postgresql/entities/UserPaymentMethod.entity';
import { Gender, UserType } from 'src/users/domain/enums';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('user_pkey', ['id'], { unique: true })
@Index('user_id_user_username_idx', ['id', 'username'], { unique: true })
@Index('user_username_idx', ['username'], { unique: true })
@Index('user_email_idx', ['email'], {})
@Entity('user')
export class User extends IGenericAdditionalPropsWithTimeStamptz {
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
    enum: Gender,
    name: 'gender',
    nullable: true,
  })
  gender?: Gender;

  @Column('character varying', { name: 'avatar_img', nullable: true })
  avatarImg?: string;

  @Column('timestamptz', {
    name: 'last_connection',
    nullable: true,
  })
  lastConnection?: Date;

  // Relations
  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  userAddress: UserAddress[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(
    () => UserPaymentMethod,
    (userPaymentMethod) => userPaymentMethod.user,
  )
  userPaymentMethods: UserPaymentMethod[];

  @OneToMany(() => ShoppingCart, (shoppingCart) => shoppingCart.user)
  shoppingCarts: ShoppingCart[];

  @OneToMany(() => ShopOrder, (shopOrder) => shopOrder.user)
  shopOrders: ShopOrder[];

  @ManyToMany(() => Role, (role) => role.users, { cascade: true, eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @BeforeInsert()
  checkFields() {
    this.email = this.email.toLowerCase();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFields();
  }
}
