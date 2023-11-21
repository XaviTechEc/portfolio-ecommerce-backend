import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IProductPromotionsDataSourceService } from 'src/product-promotions/domain/abstracts/services/product-promotions-datasource.abstract.service';
import {
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
} from 'src/product-promotions/domain/dtos/graphql/inputs/product-promotion.input';
import { IProductPromotion } from 'src/product-promotions/domain/entities/product-promotion.entity';
import { ProductPromotionFactoryService } from './factory/product-promotion-factory.service';

@Injectable()
export class ProductPromotionUseCases {
  constructor(
    private dataServices: IProductPromotionsDataSourceService,
    private productPromotionFactoryService: ProductPromotionFactoryService,
  ) {}

  getMany(props: GetManyProps<IProductPromotion>) {
    return this.dataServices.productPromotions.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.productPromotions.getOneById({ ...props });
  }

  create(props: CreateProps<CreateProductPromotionInput>) {
    const newProductPromotion =
      this.productPromotionFactoryService.createProductPromotion(props.data);
    return this.dataServices.productPromotions.create({
      ...props,
      data: newProductPromotion,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateProductPromotionInput>) {
    const newProductPromotion =
      this.productPromotionFactoryService.updateProductPromotion(props.data);
    return this.dataServices.productPromotions.updateOneById({
      ...props,
      data: newProductPromotion,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.productPromotions.deleteOneById({ ...props });
  }
}
