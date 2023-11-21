import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IPromotionsDataSourceService } from 'src/promotions/domain/abstracts/services/promotions-datasource.abstract.service';
import {
  CreatePromotionInput,
  UpdatePromotionInput,
} from 'src/promotions/domain/dtos/graphql/inputs/promotion.input';
import { IPromotion } from 'src/promotions/domain/entities/promotion.entity';
import { PromotionFactoryService } from './factory/promotion-factory.service';

@Injectable()
export class PromotionUseCases {
  constructor(
    private dataServices: IPromotionsDataSourceService,
    private promotionFactoryService: PromotionFactoryService,
  ) {}

  getMany(props: GetManyProps<IPromotion>) {
    return this.dataServices.promotions.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.promotions.getOneById({ ...props });
  }

  create(props: CreateProps<CreatePromotionInput>) {
    const newPromotion = this.promotionFactoryService.createPromotion(
      props.data,
    );
    return this.dataServices.promotions.create({
      ...props,
      data: newPromotion,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdatePromotionInput>) {
    const newPromotion = this.promotionFactoryService.updatePromotion(
      props.data,
    );
    return this.dataServices.promotions.updateOneById({
      ...props,
      data: newPromotion,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.promotions.deleteOneById({ ...props });
  }
}
