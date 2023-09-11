import { Injectable } from '@nestjs/common';
import {
  CreateSeasonInput,
  UpdateSeasonInput,
} from 'src/seasons/domain/dtos/graphql/inputs/season.input';
import { ISeason } from 'src/seasons/domain/entities/season.entity';

@Injectable()
export class SeasonFactoryService {
  createSeason(createSeasonInput: CreateSeasonInput) {
    const newSeason = new ISeason();
    newSeason.description = createSeasonInput.description;
    newSeason.startDate = createSeasonInput.startDate;
    newSeason.endDate = createSeasonInput.endDate;
    return newSeason;
  }
  updateSeason(updateSeasonInput: UpdateSeasonInput) {
    const newSeason = new ISeason();
    newSeason.description = updateSeasonInput.description;
    newSeason.startDate = updateSeasonInput.startDate;
    newSeason.endDate = updateSeasonInput.endDate;
    return newSeason;
  }
}
