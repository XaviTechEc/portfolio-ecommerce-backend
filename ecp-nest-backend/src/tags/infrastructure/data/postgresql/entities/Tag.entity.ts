import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductTag } from 'src/product-tags/infrastructure/data/postgresql/entities/ProductTag.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('tag_pkey', ['id'], { unique: true })
@Index('tag_code_idx', ['code'], {})
@Entity('tag')
export class Tag extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'code', unique: true })
  code: string;

  @Column('character varying', { name: 'value' })
  value: string;

  // Relations
  @OneToMany(() => ProductTag, (productTag) => productTag.tag)
  productTag: ProductTag[];
}
