import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category.entity';
import { VariationOption } from './VariationOption.entity';

@Index('variation_pkey', ['id'], { unique: true })
@Entity('variation')
export class Variation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'category_id' })
  categoryId: string;

  @Column('character varying', { name: 'name' })
  name: string;

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
