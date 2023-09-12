import { Injectable } from '@nestjs/common';
import {
  CreateProductItemInput,
  UpdateProductItemInput,
} from 'src/product-items/domain/dtos/graphql/inputs/product-item.input';
import { IProductItem } from 'src/product-items/domain/entities/product-item.entity';

@Injectable()
export class ProductItemFactoryService {
  createProductItem(createProductItemInput: CreateProductItemInput) {
    const newProductItem = new IProductItem();
    newProductItem.product = createProductItemInput.product;
    newProductItem.sku = createProductItemInput.sku;
    newProductItem.quantityInStock = createProductItemInput.quantityInStock;
    newProductItem.price = createProductItemInput.price;
    newProductItem.slug = createProductItemInput.slug;
    return newProductItem;
  }
  updateProductItem(updateProductItemInput: UpdateProductItemInput) {
    const newProductItem = new IProductItem();
    newProductItem.product = updateProductItemInput.product;
    newProductItem.sku = updateProductItemInput.sku;
    newProductItem.quantityInStock = updateProductItemInput.quantityInStock;
    newProductItem.price = updateProductItemInput.price;
    newProductItem.slug = updateProductItemInput.slug;
    return newProductItem;
  }
}
