import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ImageType } from 'src/images/domain/object-types/image.type';
import { SeasonType } from 'src/seasons/domain/object-types/season.type';
import { StoreType } from 'src/stores/domain/object-types/store-type';

@ObjectType()
export class BillboardType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => [ImageType])
  images: ImageType[];

  @Field(() => StoreType)
  store: StoreType;

  @Field(() => SeasonType)
  season: SeasonType;
}
