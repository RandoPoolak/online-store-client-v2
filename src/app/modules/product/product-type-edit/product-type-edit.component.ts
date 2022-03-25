import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../shared/models/ProductType";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ProductService} from "../../../shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-type-edit',
  templateUrl: './product-type-edit.component.html',
  styleUrls: ['./product-type-edit.component.css']
})
export class ProductTypeEditComponent implements OnInit {
  productType: any;
  productTypeForm = this.formBuilder.group({
    name: new FormControl()
  })

  request_id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.request_id = +params['id'];
      this.requestProductType(this.request_id);
    })
  }

  requestProductType(id: number){
    this.productService.getProductTypeById(id).subscribe((value => {
      this.productType = <ProductType>value;
      this.initForm();
    }))
  }

  onSubmit():void{
    this.productType.name = this.productTypeForm.value.name;
    this.productService.updateProductType(this.productType).subscribe(() =>{
      this.router.navigate(['/admin/2']).then(r => console.log("Redirect ->" +r))
    })
  }

  initForm() {
    this.productTypeForm = this.formBuilder.group({
      name: new FormControl(this.productType.name, Validators.required)
    })
  }
}
