import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductConfiguration } from './ProductConfiguration.entity';
import { Variation } from './Variation.entity';

@Index('variation_option_pkey', ['id'], { unique: true })
@Entity('variation_option')
export class VariationOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'variation_id' })
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
