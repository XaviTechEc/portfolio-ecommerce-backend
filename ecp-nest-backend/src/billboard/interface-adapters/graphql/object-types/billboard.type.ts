import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IImage } from 'src/images/domain/entities/image.entity';
import { ImageType } from 'src/images/interface-adapters/graphql/object-types/image.type';
import { ISeason } from 'src/seasons/domain/entities/season.entity';
import { SeasonType } from 'src/seasons/interface-adapters/graphql/object-types/season.type';
import { IStore } from 'src/stores/domain/entities/store.entity';
import { Store } from 'src/stores/infrastructure/data/postgresql/entities/Store.entity';

@ObjectType()
export class BillboardType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  // Relations
  @Field(() => [ImageType])
  images: IImage[];

  @Field(() => Store)
  store: IStore;

  @Field(() => SeasonType)
  season: ISeason;
}
