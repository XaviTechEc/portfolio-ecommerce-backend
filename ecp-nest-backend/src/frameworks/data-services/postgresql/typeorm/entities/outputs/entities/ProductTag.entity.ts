import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './Product.entity';
import { Tag } from './Tag.entity';

@Entity('product_tag')
export class ProductTag {
  // Relations
  @ManyToOne(() => Product, (product) => product.productTag)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Tag, (tag) => tag.productTag)
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tag: Tag;
}
