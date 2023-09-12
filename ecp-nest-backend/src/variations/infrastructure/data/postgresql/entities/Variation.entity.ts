import { Category } from 'src/categories/infrastructure/data/postgresql/entities/Category.entity';
import { VariationOption } from 'src/variation-options/infrastructure/data/postgresql/entities/VariationOption.entity';
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
