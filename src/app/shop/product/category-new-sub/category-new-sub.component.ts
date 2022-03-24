import {Component, OnInit} from '@angular/core';
import {Author} from "../../../shared/models/Author";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Category} from "../../../shared/models/Category";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {AuthorService} from "../../../shared/services/author.service";

@Component({
  selector: 'app-category-new-sub',
  templateUrl: './category-new-sub.component.html',
  styleUrls: ['./category-new-sub.component.css']
})
export class CategoryNewSubComponent implements OnInit {

  newProduct:any;
  category: any;

  authors: Author[] = [];

  categoryNewSubForm = this.formBuilder.group({
    description: new FormControl('', Validators.required),
    thumbnailUrl: new FormControl('', Validators.required),
    price: new FormControl(Validators.required),
    stock: new FormControl(Validators.required),
    author: new FormControl(Validators.required),
  })

  request_id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private authorService: AuthorService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.request_id = +params['id'];
      this.authorService.getAllAuthors().subscribe(value => this.authors = <Author[]>value);
      this.requestCategory(this.request_id);
    })
  }

  requestCategory(id: number) {
    this.productService.getCategoryById(id).subscribe(value => {
      this.category = <Category>value;
    })
  }

  onSubmit(): void {
    this.newProduct = this.categoryNewSubForm.value;
    this.newProduct.id = 0;
    this.newProduct.active = true;
    this.category.products.push(this.newProduct);
    this.productService.updateCategory(this.category).subscribe(()=>{
      this.router.navigate(['/admin/2']).then(r => console.log("Redirected ->"+r))
    });
  }

}
