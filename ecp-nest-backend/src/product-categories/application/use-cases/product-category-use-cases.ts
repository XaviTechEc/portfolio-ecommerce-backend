import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IProductCategoriesDataSourceService } from 'src/product-categories/domain/abstracts/services/product-categories-datasource.abstract.service';
import {
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from 'src/product-categories/domain/dtos/graphql/inputs/product-category.input';
import { IProductCategory } from 'src/product-categories/domain/entities/product-category.entity';
import { ProductCategoryFactoryService } from './factory/product-category-factory.service';

@Injectable()
export class ProductCategoryUseCases {
  constructor(
    private dataServices: IProductCategoriesDataSourceService,
    private productCategoryFactoryService: ProductCategoryFactoryService,
  ) {}

  getMany(props: GetManyProps<IProductCategory>) {
    return this.dataServices.productCategories.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.productCategories.getOneById({ ...props });
  }

  create(props: CreateProps<CreateProductCategoryInput>) {
    const newProductCategory =
      this.productCategoryFactoryService.createProductCategory(props.data);
    return this.dataServices.productCategories.create({
      ...props,
      data: newProductCategory,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateProductCategoryInput>) {
    const newProductCategory =
      this.productCategoryFactoryService.updateProductCategory(props.data);
    return this.dataServices.productCategories.updateOneById({
      ...props,
      data: newProductCategory,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.productCategories.deleteOneById({ ...props });
  }
}
