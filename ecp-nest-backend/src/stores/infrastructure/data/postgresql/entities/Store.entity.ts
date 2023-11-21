import { ObjectType } from '@nestjs/graphql';
import { Billboard } from 'src/billboard/infrastructure/data/postgresql/entities/billboard.entity';
import { Category } from 'src/categories/infrastructure/data/postgresql/entities/Category.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('store_pkey', ['id'], { unique: true })
@Index('store_name_idx', ['name'], { unique: true })
@Index('store_slug_idx', ['slug'], { unique: true })
@ObjectType()
@Entity('store')
export class Store extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'name', unique: true })
  name: string;

  @Column('character varying', { name: 'description', nullable: true })
  description?: string;

  @Column('character varying', { name: 'slug', unique: true })
  slug: string;

  // Relations
  @OneToMany(() => Billboard, (billboard) => billboard.store)
  billboards: Billboard[];

  @OneToMany(() => Category, (category) => category.store)
  categories: Category[];
}
