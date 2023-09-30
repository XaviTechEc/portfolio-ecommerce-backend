import { Image } from 'src/images/infrastructure/data/postgresql/entities/Image.entity';
import { Season } from 'src/seasons/infrastructure/data/postgresql/entities/Season.entity';
import { Store } from 'src/stores/infrastructure/data/postgresql/entities/Store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('billboard')
export class Billboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'title' })
  title: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @OneToMany(() => Image, (image) => image.billboard)
  images: Image[];

  @ManyToOne(() => Store, (store) => store.billboards)
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Store;

  @ManyToOne(() => Season, (season) => season.billboards)
  @JoinColumn([{ name: 'season_id', referencedColumnName: 'id' }])
  season: Season;
}
