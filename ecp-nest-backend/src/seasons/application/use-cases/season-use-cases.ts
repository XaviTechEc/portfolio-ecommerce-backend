import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { ISeasonsDataSourceService } from 'src/seasons/domain/abstracts/services/seasons-datasource.abstract.service';
import {
  CreateSeasonInput,
  UpdateSeasonInput,
} from 'src/seasons/domain/dtos/graphql/inputs/season.input';
import { ISeason } from 'src/seasons/domain/entities/season.entity';
import { SeasonFactoryService } from './factory/season-factory.service';

@Injectable()
export class SeasonUseCases {
  constructor(
    private dataServices: ISeasonsDataSourceService,
    private seasonFactoryService: SeasonFactoryService,
  ) {}

  getMany(props: GetManyProps<ISeason>) {
    return this.dataServices.seasons.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.seasons.getOneById({ ...props });
  }

  create(props: CreateProps<CreateSeasonInput>) {
    const newSeason = this.seasonFactoryService.createSeason(props.data);
    return this.dataServices.seasons.create({ ...props, data: newSeason });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateSeasonInput>) {
    const newSeason = this.seasonFactoryService.updateSeason(props.data);
    return this.dataServices.seasons.updateOneById({
      ...props,
      data: newSeason,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.seasons.deleteOneById({ ...props });
  }
}
