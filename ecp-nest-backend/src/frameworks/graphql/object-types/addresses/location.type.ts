import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LocationType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  lat: number;

  @Field(() => String)
  lng: number;
}
