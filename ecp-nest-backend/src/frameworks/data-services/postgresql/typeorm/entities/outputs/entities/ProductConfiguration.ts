import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { VariationOption } from './VariationOption';
import { ProductItem } from './ProductItem';

@Entity('product_configuration', { schema: 'public' })
export class ProductConfiguration {
  @Column('character varying', { name: 'product_item_id' })
  productItemId: string;

  @Column('character varying', { name: 'variation_option_id' })
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
