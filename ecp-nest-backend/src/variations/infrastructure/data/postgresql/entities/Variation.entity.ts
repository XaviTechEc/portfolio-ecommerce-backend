import { Category } from 'src/categories/infrastructure/data/postgresql/entities/Category.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { VariationOption } from 'src/variation-options/infrastructure/data/postgresql/entities/VariationOption.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('variation_pkey', ['id'], { unique: true })
@Entity('variation')
export class Variation extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  // Relations
  @OneToMany(
    () => VariationOption,
    (variationOption) => variationOption.variation,
  )
  variationOption: VariationOption[];

  @ManyToOne(() => Category, (category) => category.variations)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;
}
