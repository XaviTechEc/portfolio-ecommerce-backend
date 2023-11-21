import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { SeasonUseCases } from 'src/seasons/application/use-cases/season-use-cases';
import {
  CreateSeasonInput,
  UpdateSeasonInput,
} from 'src/seasons/domain/dtos/graphql/inputs/season.input';
import { SeasonType } from 'src/seasons/interface-adapters/graphql/object-types/season.type';

@Resolver(() => SeasonType)
export class SeasonResolver extends BaseResolver(SeasonType, {
  useCasesRef: SeasonUseCases,
  createInputRef: CreateSeasonInput,
  updateInputRef: UpdateSeasonInput,
}) {
  constructor(private seasonUseCases: SeasonUseCases) {
    super(seasonUseCases);
  }
}
