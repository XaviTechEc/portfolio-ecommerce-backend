import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category.entity';
import { Product } from './Product.entity';
import { ProductItem } from './ProductItem.entity';
import { User } from './User.entity';

@Index('image_pkey', ['id'], { unique: true })
@Index('image_product_id_idx', ['product'], {})
@Index('image_product_item_id_idx', ['productItem'], {})
@Index('image_category_id_idx', ['category'], {})
@Index('image_user_id_idx', ['user'], {})
@Entity('image')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'url', unique: true })
  url: string;

  @Column('character varying', { name: 'extension' })
  extension: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @ManyToOne(() => Product, (product) => product.image, { nullable: true })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product?: Product;

  @ManyToOne(() => ProductItem, (productItem) => productItem.image, {
    nullable: true,
  })
  @JoinColumn([{ name: 'product_item_id', referencedColumnName: 'id' }])
  productItem?: ProductItem;

  @ManyToOne(() => Category, (category) => category.image, { nullable: true })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category?: Category;

  @ManyToOne(() => User, (user) => user.image, { nullable: true })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
