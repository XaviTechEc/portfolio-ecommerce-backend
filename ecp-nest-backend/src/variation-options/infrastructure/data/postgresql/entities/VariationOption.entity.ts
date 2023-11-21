import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductConfiguration } from 'src/product-configurations/infrastructure/data/postgresql/entities/ProductConfiguration.entity';
import { Variation } from 'src/variations/infrastructure/data/postgresql/entities/Variation.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('variation_option_pkey', ['id'], { unique: true })
@Entity('variation_option')
export class VariationOption extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'value' })
  value: string;

  // Relations
  @OneToMany(
    () => ProductConfiguration,
    (productConfiguration) => productConfiguration.variationOption,
  )
  productConfiguration: ProductConfiguration[];

  @ManyToOne(() => Variation, (variation) => variation.variationOption)
  @JoinColumn([{ name: 'variation_id', referencedColumnName: 'id' }])
  variation: Variation;
}
