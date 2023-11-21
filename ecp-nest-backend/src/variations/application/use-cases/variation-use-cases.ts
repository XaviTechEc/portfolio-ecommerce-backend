import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IVariationsDataSourceService } from 'src/variations/domain/abstracts/services/variations-datasource.abstract.service';
import {
  CreateVariationInput,
  UpdateVariationInput,
} from 'src/variations/domain/dtos/graphql/inputs/variation.input';
import { IVariation } from 'src/variations/domain/entities/variation.entity';
import { VariationFactoryService } from './factory/variation-factory.service';

@Injectable()
export class VariationUseCases {
  constructor(
    private dataServices: IVariationsDataSourceService,
    private variationFactoryService: VariationFactoryService,
  ) {}

  getMany(props: GetManyProps<IVariation>) {
    return this.dataServices.variations.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.variations.getOneById({ ...props });
  }

  create(props: CreateProps<CreateVariationInput>) {
    const newVariation = this.variationFactoryService.createVariation(
      props.data,
    );
    return this.dataServices.variations.create({
      ...props,
      data: newVariation,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateVariationInput>) {
    const newVariation = this.variationFactoryService.updateVariation(
      props.data,
    );
    return this.dataServices.variations.updateOneById({
      ...props,
      data: newVariation,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.variations.deleteOneById({ ...props });
  }
}
