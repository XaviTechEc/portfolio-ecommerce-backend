import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductItem } from './ProductItem.entity';
import { VariationOption } from './VariationOption.entity';

@Entity('product_configuration')
export class ProductConfiguration {
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
