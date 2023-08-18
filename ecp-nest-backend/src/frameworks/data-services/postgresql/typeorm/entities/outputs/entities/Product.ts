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
import { ProductImage } from './ProductImage';
import { ProductCategory } from './ProductCategory';
import { User } from './User';
import { ProductTag } from './ProductTag';
import { ProductPromotion } from './ProductPromotion';
import { ProductItem } from './ProductItem';

@Index('product_pkey', ['id'], { unique: true })
@Entity('product', { schema: 'public' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varying character', { name: 'title' })
  title: string;

  @Column('varying character', { name: 'subtitle' })
  subtitle: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('varying character', { name: 'created_by' })
  createdBy: Date;

  @Column('varying character', { name: 'updated_by', nullable: true })
  updatedBy: Date | null;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date | null;

  // Relations
  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImage: ProductImage[];

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.product,
  )
  productCategory: ProductCategory[];

  @ManyToOne(() => User, (user) => user.product)
  @JoinColumn([
    { name: 'created_by', referencedColumnName: 'id' },
    { name: 'updated_by', referencedColumnName: 'id' },
  ])
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
}
