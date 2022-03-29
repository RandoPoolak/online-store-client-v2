import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../shared/models/Product";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css'],
})
export class AdminProductListComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'img', 'desc', 'stock', 'price', 'active', 'update' ];
  dataSource = new MatTableDataSource<Product>([]);
  pageSizes = [10,25,50];

  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar,
  ) {
  }


  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(productData => {
      this.dataSource.data = productData as Product[];
      this.dataSource.paginator = this.paginator;
    })
  }

  submitData(product: Product){
    this.productService.updateProduct(product).subscribe(()=>{
      this.openSnackBar("Stock updated!", "Done")
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
