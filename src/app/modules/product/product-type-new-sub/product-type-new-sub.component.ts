import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../shared/models/ProductType";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Category} from "../../../shared/models/Category";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-product-type-new-sub',
  templateUrl: './product-type-new-sub.component.html',
  styleUrls: ['./product-type-new-sub.component.css']
})
export class ProductTypeNewSubComponent implements OnInit {
  productType: any;
  newCategory: Category={
    active: true, id: 0, name: "", products: []
  }

  productTypeNewSubForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
  })

  request_id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.request_id = +params['id'];
      this.requestProductType(this.request_id);
    })
  }

  requestProductType(id: number){
    this.productService.getProductTypeById(id).subscribe(value => {
      this.productType = <ProductType>value;
    })
  }

  onSubmit(): void{
    this.newCategory.name = this.productTypeNewSubForm.value.name;
    this.productType.categories.push(this.newCategory);
    this.productService.updateProductType(this.productType).subscribe(() =>{
      this.router.navigate(['/admin/2']).then(r=> console.log("Redirected ->"+r))
    });
  }

}
