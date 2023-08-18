import { PrimaryGeneratedColumn } from 'typeorm';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User';

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

  @Column('boolean', { name: 'visible', nullable: true, default: () => 'true' })
  visible: boolean | null;

  @Column('varying character', { name: 'comment_parent_id', nullable: true })
  commentParentId: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => Date.now(),
  })
  createdAt: Date | null;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Comment, (comment) => comment.comment)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.comments)
  @JoinColumn([{ name: 'comment_parent_id', referencedColumnName: 'id' }])
  comment: Comment;
}
