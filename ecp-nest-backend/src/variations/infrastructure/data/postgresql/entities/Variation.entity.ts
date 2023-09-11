import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category.entity';
import { VariationOption } from './VariationOption.entity';

@Index('variation_pkey', ['id'], { unique: true })
@Entity('variation')
export class Variation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @OneToMany(
    () => VariationOption,
    (variationOption) => variationOption.variation,
  )
  variationOption: VariationOption[];

  @ManyToOne(() => Category, (category) => category.variation)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;
}
