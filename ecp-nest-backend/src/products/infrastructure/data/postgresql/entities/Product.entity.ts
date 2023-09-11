import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductCategory } from './ProductCategory.entity';
import { User } from './User.entity';
import { ProductTag } from './ProductTag.entity';
import { ProductPromotion } from './ProductPromotion.entity';
import { ProductItem } from './ProductItem.entity';
import { Image } from './Image.entity';

@Index('product_pkey', ['id'], { unique: true })
@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'title' })
  title: string;

  @Column('character varying', { name: 'subtitle' })
  subtitle: string;

  @Column('text', { name: 'description' })
  description: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.product,
  )
  productCategory: ProductCategory[];

  @ManyToOne(() => User, (user) => user.product)
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => ProductTag, (productTag) => productTag.product)
  productTag: ProductTag[];

  @OneToMany(
    () => ProductPromotion,
    (productPromotion) => productPromotion.product,
  )
  productPromotion: ProductPromotion[];

  @OneToMany(() => ProductItem, (productItem) => productItem.product)
  productItem: ProductItem[];

  @OneToMany(() => Image, (image) => image.product)
  image: Image[];
}
