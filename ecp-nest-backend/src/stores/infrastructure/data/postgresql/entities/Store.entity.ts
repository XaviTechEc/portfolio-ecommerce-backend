import { Billboard } from 'src/billboard/infrastructure/data/postgresql/entities/billboard.entity';
import { Category } from 'src/categories/infrastructure/data/postgresql/entities/Category.entity';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('store_pkey', ['id'], { unique: true })
@Index('store_slug_idx', ['slug'], {})
@Entity('store')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'description', nullable: true })
  description?: string;

  @Column('character varying', { name: 'slug' })
  slug: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @OneToMany(() => Billboard, (billboard) => billboard.store)
  billboards: Billboard[];

  @OneToMany(() => Category, (category) => category.store)
  categories: Category[];

  @ManyToOne(() => User, (user) => user.stores)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
