import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { SeasonUseCases } from 'src/seasons/application/use-cases/season-use-cases';
import {
  CreateSeasonInput,
  UpdateSeasonInput,
} from 'src/seasons/domain/dtos/graphql/inputs/season.input';
import { SeasonType } from 'src/seasons/domain/object-types/season.type';

@Resolver(() => SeasonType)
export class SeasonResolver {
  constructor(private seasonUseCases: SeasonUseCases) {}

  @Query(() => [SeasonType], { name: 'seasons' })
  getAllSeason(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.seasonUseCases.getAllSeasons({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => SeasonType, { name: 'season' })
  getSeasonById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.seasonUseCases.getSeasonById(id);
  }

  @Mutation(() => SeasonType)
  createSeason(
    @Args('createSeasonInput') createSeasonInput: CreateSeasonInput,
  ) {
    return this.seasonUseCases.createSeason(createSeasonInput);
  }

  @Mutation(() => SeasonType)
  updateSeason(
    @Args('updateSeasonInput') updateSeasonInput: UpdateSeasonInput,
  ) {
    return this.seasonUseCases.updateSeason(
      updateSeasonInput.id,
      updateSeasonInput,
    );
  }

  @Mutation(() => SeasonType)
  removeSeason(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.seasonUseCases.removeSeason(id);
  }
}
