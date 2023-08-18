import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductTag } from './ProductTag';

@Index('tag_pkey', ['id'], { unique: true })
@Index('tag_code_idx', ['code'], {})
@Entity('tag', { schema: 'public' })
export class Tag {
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
