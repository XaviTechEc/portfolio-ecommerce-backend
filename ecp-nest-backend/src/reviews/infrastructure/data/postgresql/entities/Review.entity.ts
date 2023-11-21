import { Comment } from 'src/comments/infrastructure/data/postgresql/entities/Comment.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { OrderLine } from 'src/order-lines/infrastructure/data/postgresql/entities/OrderLine.entity';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('review_pkey', ['id'], { unique: true })
@Index('review_user_id_ordered_product_id_idx', ['orderLine', 'user'], {
  unique: true,
})
@Index('review_ordered_product_id_idx', ['orderLine'], {})
@Index('review_visible_idx', ['visible'], {})
@Entity('review')
export class Review extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('smallint', { name: 'rating_value' })
  ratingValue: number;

  @Column('text', { name: 'content', nullable: true })
  content?: string;

  @Column('boolean', { name: 'visible', nullable: true, default: true })
  visible?: boolean;

  // Relations
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => OrderLine, (orderLine) => orderLine.review)
  @JoinColumn([{ name: 'ordered_product_id', referencedColumnName: 'id' }])
  orderLine: OrderLine;

  @OneToMany(() => Comment, (comment) => comment.review)
  comment: Comment[];
}
