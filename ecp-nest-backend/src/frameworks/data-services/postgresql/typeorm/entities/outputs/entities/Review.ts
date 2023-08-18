import { Column, Entity, Index, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

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
  @Column('character varying', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'user_id' })
  userId: string;

  @Column('character varying', { name: 'ordered_product_id' })
  orderedProductId: string;

  @Column('integer', { name: 'rating_value' })
  ratingValue: number;

  @Column('boolean', { name: 'visible', nullable: true, default: () => 'true' })
  visible: boolean | null;

  @Column('character varying', { name: 'comment_id', nullable: true })
  commentId: string | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => "'2023-08-17 18:59:44.56802'",
  })
  createdAt: Date | null;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.review)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
