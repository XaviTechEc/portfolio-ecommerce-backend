import { Field, ObjectType } from '@nestjs/graphql';
import { IBillboard } from 'src/billboard/domain/entities/billboard.entity';
import { BillboardType } from 'src/billboard/interface-adapters/graphql/object-types/billboard.type';
import { ICategory } from 'src/categories/domain/entities/category.entity';
import { CategoryType } from 'src/categories/interface-adapters/graphql/object-types/category.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@ObjectType()
export class SeasonType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  // Relations
  @Field(() => CategoryType)
  categories: ICategory[];

  @Field(() => [BillboardType])
  billboards: IBillboard[];
}
