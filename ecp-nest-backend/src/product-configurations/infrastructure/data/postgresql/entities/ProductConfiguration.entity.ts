import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductItem } from './ProductItem.entity';
import { VariationOption } from './VariationOption.entity';

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
