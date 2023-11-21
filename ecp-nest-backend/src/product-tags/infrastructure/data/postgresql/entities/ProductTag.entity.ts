import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { Product } from 'src/products/infrastructure/data/postgresql/entities/Product.entity';
import { Tag } from 'src/tags/infrastructure/data/postgresql/entities/Tag.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_tag')
export class ProductTag extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
