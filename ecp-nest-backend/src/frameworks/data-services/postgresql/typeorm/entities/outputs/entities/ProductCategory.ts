import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from './Category';
import { Product } from './Product';

@Entity('product_category', { schema: 'public' })
export class ProductCategory {
  @Column('character varying', { name: 'product_id' })
  productId: string;

  @Column('character varying', { name: 'category_id' })
  categoryId: string;

  // Relations
  @ManyToOne(() => Product, (product) => product.productCategory)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Category, (category) => category.productCategories)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;
}
