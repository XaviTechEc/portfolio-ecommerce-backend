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
import { User } from './User';
import { Review } from './Review';

@Index('comment_pkey', ['id'], { unique: true })
@Index('comment_user_id_idx', ['userId'], {})
@Index('comment_visible_idx', ['visible'], {})
@Entity('comment', { schema: 'public' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'user_id' })
  userId: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('boolean', { name: 'visible', default: true })
  visible: boolean;

  @Column('varying character', { name: 'comment_parent_id', nullable: true })
  commentParentId: string | null;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date | null;

  // Relations
  @ManyToOne(() => Review)
  @JoinColumn([{ name: 'id', referencedColumnName: 'comment_id' }])
  review: Review;

  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Comment, (comment) => comment.comment)
  comments: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.comments)
  @JoinColumn([{ name: 'comment_parent_id', referencedColumnName: 'id' }])
  comment: Comment;
}
