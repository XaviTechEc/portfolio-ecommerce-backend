import { ProductItem } from 'src/product-items/infrastructure/data/postgresql/entities/ProductItem.entity';
import { VariationOption } from 'src/variation-options/infrastructure/data/postgresql/entities/VariationOption.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('product_configuration')
export class ProductConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('character varying', { name: 'product_item_id' })
  productItemId: string;

  @PrimaryColumn('character varying', { name: 'variation_option_id' })
  variationOptionId: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @ManyToOne(
    () => ProductItem,
    (productItem) => productItem.productConfiguration,
  )
  @JoinColumn([{ name: 'product_item_id', referencedColumnName: 'id' }])
  productItem: ProductItem;

  @ManyToOne(
    () => VariationOption,
    (variationOption) => variationOption.productConfiguration,
  )
  @JoinColumn([{ name: 'variation_option_id', referencedColumnName: 'id' }])
  variationOption: VariationOption;
}
