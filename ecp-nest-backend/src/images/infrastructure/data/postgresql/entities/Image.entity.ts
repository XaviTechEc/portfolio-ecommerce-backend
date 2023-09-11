import { Category } from 'src/categories/infrastructure/data/postgresql/entities/Category.entity';
import { ProductItem } from 'src/product-items/infrastructure/data/postgresql/entities/ProductItem.entity';
import { Product } from 'src/products/infrastructure/data/postgresql/entities/Product.entity';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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
