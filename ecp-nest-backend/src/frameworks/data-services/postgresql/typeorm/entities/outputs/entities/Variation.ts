import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { VariationOption } from './VariationOption';

@Index('variation_pkey', ['id'], { unique: true })
@Entity('variation', { schema: 'public' })
export class Variation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varying character', { name: 'category_id' })
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
