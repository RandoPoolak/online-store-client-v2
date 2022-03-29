import { Component, OnInit } from '@angular/core';
import {Category} from "../../../shared/models/Category";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ProductService} from "../../../shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category: any;

  categoryForm = this.formBuilder.group({
    name: new FormControl()
  })

  request_id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    if(JSON.parse(sessionStorage.getItem('userRole')!) != "ADMIN"){
      this.router.navigate(['/not-allowed']).then();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.request_id = +params['id'];
      this.requestCategory(this.request_id);
    })
  }

  requestCategory(id:number){
    this.productService.getCategoryById(id).subscribe((value => {
      this.category = <Category>value;
      this.initForm();
    }))
  }

  initForm(){
    this.categoryForm = this.formBuilder.group({
      name: new FormControl(this.category.name, Validators.required),
    })
  }

  onSubmit(): void{
    this.category.name = this.categoryForm.value.name;
    this.productService.updateCategory(this.category).subscribe(()=>{
      this.router.navigate(['/admin/2']).then(r=> console.log("Redirect ->" +r))
    })
  }
}
