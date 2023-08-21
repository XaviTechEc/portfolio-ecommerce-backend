import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './Product.entity';
import { Tag } from './Tag.entity';

@Entity('product_tag')
export class ProductTag {
  @PrimaryColumn('character varying', { name: 'product_id' })
  productId: string;

  @PrimaryColumn('character varying', { name: 'tag_id' })
  tagId: string;

  // Relations
  @ManyToOne(() => Product, (product) => product.productTag)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Tag, (tag) => tag.productTag)
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tag: Tag;
}
