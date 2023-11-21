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

@Index('season_pkey', ['id'], { unique: true })
@Entity('season')
export class Season extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('timestamptz', {
    name: 'start_date',
    nullable: true,
  })
  startDate?: Date;

  @Column('timestamptz', { name: 'end_date', nullable: true })
  endDate?: Date;

  // Relations
  @OneToMany(() => Category, (category) => category.season)
  categories: Category[];

  @OneToMany(() => Billboard, (billboard) => billboard.season)
  billboards: Billboard[];
}
