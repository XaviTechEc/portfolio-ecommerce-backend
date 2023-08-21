import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category.entity';

@Index('season_pkey', ['id'], { unique: true })
@Entity('season')
export class Season {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('timestamptz', {
    name: 'start_date',
    nullable: true,
  })
  startDate: Date | null;

  @Column('timestamptz', { name: 'end_date', nullable: true })
  endDate: Date | null;

  // Relations
  @OneToMany(() => Category, (category) => category.season)
  category: Category[];
}
