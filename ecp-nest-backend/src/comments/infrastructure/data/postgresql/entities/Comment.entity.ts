import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { Review } from 'src/reviews/infrastructure/data/postgresql/entities/Review.entity';
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

@Index('comment_pkey', ['id'], { unique: true })
@Index('comment_user_id_idx', ['user'], {})
@Entity('comment')
export class Comment extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'content' })
  content: string;

  // Relations
  @ManyToOne(() => Review, (review) => review.comment)
  @JoinColumn([{ name: 'review_id', referencedColumnName: 'id' }])
  review: Review;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Comment, (comment) => comment.comment)
  comments: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.comments)
  @JoinColumn([{ name: 'comment_parent_id', referencedColumnName: 'id' }])
  comment?: Comment;
}
