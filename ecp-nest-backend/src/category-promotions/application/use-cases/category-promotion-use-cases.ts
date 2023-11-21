import { Injectable } from '@nestjs/common';
import { ICategoryPromotionsDataSourceService } from 'src/category-promotions/domain/abstracts/services/category-promotions-datasource.abstract.service';
import {
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/category-promotions/domain/dtos/graphql/inputs/category-promotion.input';
import { ICategoryPromotion } from 'src/category-promotions/domain/entities/category-promotion.entity';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { CategoryPromotionFactoryService } from './factory/category-promotion-factory.service';

@Injectable()
export class CategoryPromotionUseCases {
  constructor(
    private dataServices: ICategoryPromotionsDataSourceService,
    private categoryPromotionFactoryService: CategoryPromotionFactoryService,
  ) {}

  getMany(props: GetManyProps<ICategoryPromotion>) {
    return this.dataServices.categoryPromotions.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.categoryPromotions.getOneById({ ...props });
  }

  create(props: CreateProps<CreateCategoryPromotionInput>) {
    const newCategoryPromotion =
      this.categoryPromotionFactoryService.createCategoryPromotion(props.data);
    return this.dataServices.categoryPromotions.create({
      ...props,
      data: newCategoryPromotion,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateCategoryPromotionInput>) {
    const newCategoryPromotion =
      this.categoryPromotionFactoryService.updateCategoryPromotion(props.data);
    return this.dataServices.categoryPromotions.updateOneById({
      ...props,
      data: newCategoryPromotion,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.categoryPromotions.deleteOneById({ ...props });
  }
}
