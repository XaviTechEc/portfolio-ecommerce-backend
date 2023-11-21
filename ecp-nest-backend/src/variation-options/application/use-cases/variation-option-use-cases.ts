import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IVariationOptionsDataSourceService } from 'src/variation-options/domain/abstracts/services/variation-options-datasource.abstract.service';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/variation-options/domain/dtos/graphql/inputs/variation-option.input';
import { IVariationOption } from 'src/variation-options/domain/entities/variation-option.entity';
import { VariationOptionFactoryService } from './factory/variation-option-factory.service';

@Injectable()
export class VariationOptionUseCases {
  constructor(
    private dataServices: IVariationOptionsDataSourceService,
    private variationOptionFactoryService: VariationOptionFactoryService,
  ) {}

  getMany(props: GetManyProps<IVariationOption>) {
    return this.dataServices.variationOptions.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.variationOptions.getOneById({ ...props });
  }

  create(props: CreateProps<CreateVariationOptionInput>) {
    const newVariationOption =
      this.variationOptionFactoryService.createVariationOption(props.data);
    return this.dataServices.variationOptions.create({
      ...props,
      data: newVariationOption,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateVariationOptionInput>) {
    const newVariationOption =
      this.variationOptionFactoryService.updateVariationOption(props.data);
    return this.dataServices.variationOptions.updateOneById({
      ...props,
      data: newVariationOption,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.variationOptions.deleteOneById({ ...props });
  }
}
