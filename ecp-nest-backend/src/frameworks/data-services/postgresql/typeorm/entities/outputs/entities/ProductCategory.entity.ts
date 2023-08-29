import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from './Category.entity';
import { Product } from './Product.entity';

@Entity('product_category')
export class ProductCategory {
  // Relations
  @ManyToOne(() => Product, (product) => product.productCategory)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Category, (category) => category.productCategory)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;
}
