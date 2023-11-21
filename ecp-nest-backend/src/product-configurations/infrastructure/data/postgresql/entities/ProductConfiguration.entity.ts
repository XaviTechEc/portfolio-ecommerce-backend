import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductItem } from 'src/product-items/infrastructure/data/postgresql/entities/ProductItem.entity';
import { VariationOption } from 'src/variation-options/infrastructure/data/postgresql/entities/VariationOption.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_configuration')
export class ProductConfiguration extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
