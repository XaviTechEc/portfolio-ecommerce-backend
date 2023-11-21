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
    newSeason.name = createSeasonInput.name;
    newSeason.description = createSeasonInput.description;
    newSeason.startDate = createSeasonInput.startDate;
    newSeason.endDate = createSeasonInput.endDate;
    newSeason.active = createSeasonInput.active;
    return newSeason;
  }
  updateSeason(updateSeasonInput: UpdateSeasonInput) {
    const newSeason = new ISeason();
    newSeason.id = updateSeasonInput.id;
    newSeason.name = updateSeasonInput.name;
    newSeason.description = updateSeasonInput.description;
    newSeason.startDate = updateSeasonInput.startDate;
    newSeason.endDate = updateSeasonInput.endDate;
    newSeason.active = updateSeasonInput.active;
    return newSeason;
  }
}
