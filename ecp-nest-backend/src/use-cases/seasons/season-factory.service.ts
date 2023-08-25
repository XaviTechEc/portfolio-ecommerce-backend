import { Injectable } from '@nestjs/common';
import { CreateSeasonInput, UpdateSeasonInput } from 'src/core/dtos';
import { ISeason } from 'src/core/entities';

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
