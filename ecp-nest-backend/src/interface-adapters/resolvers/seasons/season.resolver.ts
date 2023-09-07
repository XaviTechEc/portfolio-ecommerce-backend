import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateSeasonInput,
  UpdateSeasonInput,
} from 'src/core/dtos';
import { ISeason } from 'src/core/entities';
import { SeasonType } from 'src/core/object-types';
import { SeasonUseCases } from 'src/use-cases';

@Resolver(() => SeasonType)
export class SeasonResolver {
  constructor(private seasonUseCases: SeasonUseCases) {}

  @Query(() => [SeasonType], { name: 'seasons' })
  getAllSeason(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<ISeason[]> {
    return this.seasonUseCases.getAllSeasons({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => SeasonType, { name: 'season' })
  getSeasonById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ISeason> {
    return this.seasonUseCases.getSeasonById(id);
  }

  @Mutation(() => SeasonType)
  createSeason(@Args() createSeasonInput: CreateSeasonInput): Promise<ISeason> {
    return this.seasonUseCases.createSeason(createSeasonInput);
  }

  @Mutation(() => SeasonType)
  updateSeason(@Args() updateSeasonInput: UpdateSeasonInput): Promise<ISeason> {
    return this.seasonUseCases.updateSeason(
      updateSeasonInput.id,
      updateSeasonInput,
    );
  }

  @Mutation(() => SeasonType)
  removeSeason(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ISeason> {
    return this.seasonUseCases.removeSeason(id);
  }
}
