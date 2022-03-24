import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../models/ProductType";
import {Category} from "../models/Category";
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private PRODUCT_BASE_URL = 'product';
  private CATEGORY_BASE_URL = 'category';
  private PRODUCT_TYPE_BASE_URL = 'product-type';

  constructor(private httpClient: HttpClient) {
  }

  public getAllProductTypes() {
    return this.httpClient.get(this.PRODUCT_TYPE_BASE_URL);
  }

  public createProductType(productType: ProductType) {
    let newProductType = JSON.stringify(productType)
    return this.httpClient.post(this.PRODUCT_TYPE_BASE_URL + "/create", newProductType);
  }

  public getProductTypeById(id: number) {
    return this.httpClient.get(this.PRODUCT_TYPE_BASE_URL + "/" + id);
  }

  public getCategoryById(id: number) {
    return this.httpClient.get(this.CATEGORY_BASE_URL + "/" + id);
  }

  public getProductById(id: number) {
    return this.httpClient.get(this.PRODUCT_BASE_URL + "/" + id);
  }

  public updateProductType(productType: ProductType) {
    let newProductType = JSON.stringify(productType);
    return this.httpClient.post(this.PRODUCT_TYPE_BASE_URL + "/update", newProductType);
  }

  public updateCategory(category: Category){
    let newCategory = JSON.stringify(category);
    return this.httpClient.post(this.CATEGORY_BASE_URL+"/update", newCategory);
  }

  public updateProduct(product:Product){
    let newProduct = JSON.stringify(product);
    return this.httpClient.post(this.PRODUCT_BASE_URL+"/update", newProduct);
  }

  public getAllProducts(){
    return this.httpClient.get(this.PRODUCT_BASE_URL);
  }

}
