import { Column, Entity, Index, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Index('product_image_pkey', ['id'], { unique: true })
@Index('product_image_product_id_idx', ['productId'], {})
@Entity('product_image', { schema: 'public' })
export class ProductImage {
  @Column('character varying', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'product_id' })
  productId: string;

  @Column('boolean', { name: 'visible', nullable: true, default: () => true })
  visible: boolean | null;

  @Column('character varying', { name: 'uploaded_by' })
  uploadedBy: string;

  @Column('timestamp without time zone', {
    name: 'uploaded_at',
    nullable: true,
    default: () => Date.now(),
  })
  uploadedAt: Date | null;

  @ManyToOne(() => User, (user) => user.productImage)
  @JoinColumn([{ name: 'uploaded_by', referencedColumnName: 'id' }])
  user: User;
}
