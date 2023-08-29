import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductItem } from './ProductItem.entity';
import { VariationOption } from './VariationOption.entity';

@Entity('product_configuration')
export class ProductConfiguration {
  @PrimaryColumn('character varying', { name: 'product_item_id' })
  productItemId: string;

  @PrimaryColumn('character varying', { name: 'variation_option_id' })
  variationOptionId: string;

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
