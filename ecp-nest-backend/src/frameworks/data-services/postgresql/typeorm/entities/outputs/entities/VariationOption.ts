import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductConfiguration } from './ProductConfiguration';
import { Variation } from './Variation';

@Index('variation_option_pkey', ['id'], { unique: true })
@Entity('variation_option', { schema: 'public' })
export class VariationOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varying character', { name: 'variation_id' })
  variationId: string;

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
