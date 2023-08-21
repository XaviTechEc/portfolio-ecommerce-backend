import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User.entity';
import { Review } from './Review.entity';

@Index('comment_pkey', ['id'], { unique: true })
@Index('comment_user_id_idx', ['userId'], {})
@Index('comment_visible_idx', ['visible'], {})
@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'user_id' })
  userId: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('boolean', { name: 'visible', default: true })
  visible: boolean;

  @Column('character varying', { name: 'comment_parent_id', nullable: true })
  commentParentId: string | null;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date | null;

  // Relations
  @OneToMany(() => Review, (review) => review.comment)
  review: Review[];

  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Comment, (comment) => comment.comment)
  comments: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.comments)
  @JoinColumn([{ name: 'comment_parent_id', referencedColumnName: 'id' }])
  comment: Comment;
}
