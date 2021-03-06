import { Component, OnInit } from '@angular/core';
import {Product} from "../../../shared/models/Product";
import {Author} from "../../../shared/models/Author";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {AuthorService} from "../../../shared/services/author.service";


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: any;

  authors: Author[] = []

  productForm = this.formBuilder.group({
    description: new FormControl(),
    thumbnailUrl: new FormControl(),
    price: new FormControl(),
    stock: new FormControl(),
    author: new FormControl(),
  })
  request_id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private authorService: AuthorService,
    private router: Router
  ) {
    if(JSON.parse(sessionStorage.getItem('userRole')!) != "ADMIN"){
      this.router.navigate(['/not-allowed']).then();
    }
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params =>{
      this.request_id = +params['id'];
      this.authorService.getAllAuthors().subscribe(value =>this.authors = <Author[]>value);
      this.requestProduct(this.request_id);
    })
  }

  requestProduct(id:number){
    this.productService.getProductById(id).subscribe(value => {
      this.product = <Product>value;
      this.initForm();
    })
  }

  initForm(){
    let authorToForm = this.authors.find(author => author.id == this.product.author.id)
    this.productForm = this.formBuilder.group({
      description: [this.product.description, Validators.required],
      thumbnailUrl: [this.product.thumbnailUrl, Validators.required],
      price: [this.product.price, Validators.required],
      stock: [this.product.stock, Validators.required],
      author: [Validators.required],
    });
    this.productForm.get('author')?.setValue(authorToForm);

  }

  onSubmit():void{
    let editProduct = this.productForm.value;
    editProduct.id = this.product.id;
    editProduct.active = this.product.active;
    this.productService.updateProduct(editProduct).subscribe(()=>{
      this.router.navigate(['/admin/2']).then(r => console.log("Redirected ->"+r))
    });
  }
}
