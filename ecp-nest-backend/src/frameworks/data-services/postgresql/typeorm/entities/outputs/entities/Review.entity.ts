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
import { User } from './User.entity';
import { OrderLine } from './OrderLine.entity';
import { Comment } from './Comment.entity';

@Index('review_pkey', ['id'], { unique: true })
@Index('review_user_id_ordered_product_id_idx', ['orderLine', 'user'], {
  unique: true,
})
@Index('review_ordered_product_id_idx', ['orderLine'], {})
@Index('review_visible_idx', ['visible'], {})
@Entity('review')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('smallint', { name: 'rating_value' })
  ratingValue: number;

  @Column('boolean', { name: 'visible', nullable: true, default: true })
  visible?: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;

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
