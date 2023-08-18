import {
  Column,
  Entity,
  Index,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { OrderLine } from './OrderLine';
import { Comment } from './Comment';

@Index('review_pkey', ['id'], { unique: true })
@Index(
  'review_user_id_ordered_product_id_idx',
  ['orderedProductId', 'userId'],
  { unique: true },
)
@Index('review_ordered_product_id_idx', ['orderedProductId'], {})
@Index('review_visible_idx', ['visible'], {})
@Entity('review', { schema: 'public' })
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'user_id' })
  userId: string;

  @Column('character varying', { name: 'ordered_product_id' })
  orderedProductId: string;

  @Column('smallint', { name: 'rating_value' })
  ratingValue: number;

  @Column('boolean', { name: 'visible', default: true })
  visible: boolean;

  @Column('character varying', { name: 'comment_id', nullable: true })
  commentId: string | null;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date | null;

  // Relations
  @ManyToOne(() => User, (user) => user.review)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => OrderLine, (orderLine) => orderLine.review)
  @JoinColumn([{ name: 'ordered_product_id', referencedColumnName: 'id' }])
  orderLine: OrderLine;

  @OneToMany(() => Comment, (comment) => comment.review)
  comment: Comment[];
}
