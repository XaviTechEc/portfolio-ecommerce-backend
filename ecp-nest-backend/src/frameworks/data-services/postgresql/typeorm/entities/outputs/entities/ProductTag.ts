import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Tag } from './Tag';
import { Product } from './Product';

@Entity('product_tag', { schema: 'public' })
export class ProductTag {
  @Column('character varying', { name: 'product_id' })
  productId: string;

  @Column('character varying', { name: 'tag_id' })
  tagId: string;

  // Relations
  @ManyToOne(() => Product, (product) => product.productTag)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Tag, (tag) => tag.productTag)
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tag: Tag;
}
