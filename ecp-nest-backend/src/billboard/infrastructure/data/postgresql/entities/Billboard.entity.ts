import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { Image } from 'src/images/infrastructure/data/postgresql/entities/Image.entity';
import { Season } from 'src/seasons/infrastructure/data/postgresql/entities/Season.entity';
import { Store } from 'src/stores/infrastructure/data/postgresql/entities/Store.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('billboard')
export class Billboard extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'title' })
  title: string;

  @Column('text', { name: 'description', nullable: true })
  description?: string;
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
