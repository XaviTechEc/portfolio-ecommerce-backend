import { Category } from 'src/categories/infrastructure/data/postgresql/entities/Category.entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

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
  startDate?: Date;

  @Column('timestamptz', { name: 'end_date', nullable: true })
  endDate?: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @OneToMany(() => Category, (category) => category.season)
  category: Category[];
}
