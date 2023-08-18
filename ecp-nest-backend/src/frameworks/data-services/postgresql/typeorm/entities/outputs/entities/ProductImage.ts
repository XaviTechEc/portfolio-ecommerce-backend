import {
  Column,
  Entity,
  Index,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Product } from './Product';
import { ProductItem } from './ProductItem';

@Index('product_image_pkey', ['id'], { unique: true })
@Index('product_image_product_id_idx', ['productId'], {})
@Entity('product_image', { schema: 'public' })
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'product_id' })
  productId: string;

  @Column('boolean', { name: 'visible', default: true })
  visible: boolean;

  @Column('character varying', { name: 'uploaded_by' })
  uploadedBy: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date | null;

  // Relations
  @ManyToOne(() => Product, (product) => product.productImage)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => ProductItem, (productItem) => productItem.productImage)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  productItem: ProductItem;

  @ManyToOne(() => User, (user) => user.productImage)
  @JoinColumn([{ name: 'uploaded_by', referencedColumnName: 'id' }])
  user: User;
}
