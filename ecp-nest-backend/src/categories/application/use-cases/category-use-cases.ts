import { Injectable } from '@nestjs/common';
import { ICategoriesDataSourceService } from 'src/categories/domain/abstracts/services/categories-datasource.abstract.service';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from 'src/categories/domain/dtos/graphql/inputs/category.input';
import { ICategory } from 'src/categories/domain/entities/category.entity';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { CategoryFactoryService } from './factory/category-factory.service';

@Injectable()
export class CategoryUseCases {
  constructor(
    private dataServices: ICategoriesDataSourceService,
    private categoryFactoryService: CategoryFactoryService,
  ) {}

  getMany(props: GetManyProps<ICategory>) {
    return this.dataServices.categories.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.categories.getOneById({ ...props });
  }

  create(props: CreateProps<CreateCategoryInput>) {
    const newCategory = this.categoryFactoryService.createCategory(props.data);
    return this.dataServices.categories.create({ ...props, data: newCategory });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateCategoryInput>) {
    const newCategory = this.categoryFactoryService.updateCategory(props.data);
    return this.dataServices.categories.updateOneById({
      ...props,
      data: newCategory,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.categories.deleteOneById({ ...props });
  }
}
