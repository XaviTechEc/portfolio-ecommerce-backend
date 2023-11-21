import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType({ isAbstract: true })
export abstract class ITimeStamptzProps {
  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  @Field(() => Date, { name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
    default: () => 'NULL',
  })
  @Field(() => Date, { name: 'updatedAt' })
  updatedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
    default: () => 'NULL',
  })
  @Field(() => Date, { name: 'deletedAt' })
  deletedAt?: Date;
}

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export abstract class IGenericAdditionalProps {
  @Column('boolean', { name: 'active', nullable: true, default: true })
  @Field(() => Boolean, { name: 'active', nullable: true, defaultValue: true })
  active?: boolean;
}

@ObjectType({ isAbstract: true })
export abstract class IGenericAdditionalPropsWithTimeStamptz
  extends ITimeStamptzProps
  implements IGenericAdditionalProps
{
  @Column('boolean', { name: 'active', nullable: true, default: true })
  @Field(() => Boolean, { name: 'active', nullable: true, defaultValue: true })
  active?: boolean;
}

@ObjectType({ isAbstract: true })
export abstract class IGenericAdditionalPropsWithUserRefAndTimeStamps<
  TUser = any,
> extends IGenericAdditionalPropsWithTimeStamptz {
  @Column('uuid', { name: 'created_by', nullable: true })
  @Field(() => ID, { name: 'createdBy' })
  createdBy: TUser;

  @Column('uuid', { name: 'updated_by', nullable: true })
  @Field(() => ID, { name: 'updatedBy', nullable: true })
  updatedBy?: TUser;

  @Column('uuid', { name: 'deleted_by', nullable: true })
  @Field(() => ID, { name: 'deletedBy', nullable: true })
  deletedBy?: TUser;
}
