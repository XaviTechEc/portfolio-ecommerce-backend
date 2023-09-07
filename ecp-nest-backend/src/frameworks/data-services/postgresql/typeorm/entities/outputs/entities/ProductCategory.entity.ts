import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category.entity';
import { Product } from './Product.entity';

@Entity('product_category')
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('character varying', { name: 'product_id' })
  productId: string;

  @PrimaryColumn('character varying', { name: 'category_id' })
  categoryId: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @ManyToOne(() => Product, (product) => product.productCategory)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Category, (category) => category.productCategory)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;
}
