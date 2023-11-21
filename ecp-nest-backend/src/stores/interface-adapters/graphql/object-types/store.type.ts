import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IBillboard } from 'src/billboard/domain/entities/billboard.entity';
import { BillboardType } from 'src/billboard/interface-adapters/graphql/object-types/billboard.type';
import { ICategory } from 'src/categories/domain/entities/category.entity';
import { CategoryType } from 'src/categories/interface-adapters/graphql/object-types/category.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@ObjectType()
export class StoreType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  slug: string;

  // Relations
  @Field(() => [BillboardType])
  billboards: IBillboard[];

  @Field(() => [CategoryType])
  categories: ICategory[];
}
