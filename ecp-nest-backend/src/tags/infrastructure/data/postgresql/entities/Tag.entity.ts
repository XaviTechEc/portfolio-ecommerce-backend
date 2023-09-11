import { ProductTag } from 'src/product-tags/infrastructure/data/postgresql/entities/ProductTag.entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Index('tag_pkey', ['id'], { unique: true })
@Index('tag_code_idx', ['code'], {})
@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'code', unique: true })
  code: string;

  @Column('character varying', { name: 'value' })
  value: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @OneToMany(() => ProductTag, (productTag) => productTag.tag)
  productTag: ProductTag[];
}
