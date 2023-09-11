import { ProductConfiguration } from 'src/product-configurations/infrastructure/data/postgresql/entities/ProductConfiguration.entity';
import { Variation } from 'src/variations/infrastructure/data/postgresql/entities/Variation.entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Index('variation_option_pkey', ['id'], { unique: true })
@Entity('variation_option')
export class VariationOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'value' })
  value: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;
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
