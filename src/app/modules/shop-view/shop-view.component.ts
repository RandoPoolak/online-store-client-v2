import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {TreeNode} from "../../shared/models/TreeNode";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {ProductService} from "../../shared/services/product.service";
import {TreeNodeService} from "../../shared/services/tree-node.service";
import {Product} from "../../shared/models/Product";
import {ProductType} from "../../shared/models/ProductType";
import {UserService} from "../../shared/services/user.service";
import {UtilService} from "../../shared/services/util.service";
import {Router} from "@angular/router";
import {Category} from "../../shared/models/Category";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit {
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  removeFilterMessage: string = "";
  filterValue: string;
  shopData: ProductType[];
  filteredData: ProductType[];

  constructor(
    private productService: ProductService,
    private treeNodeService: TreeNodeService,
    private userService: UserService,
    private util: UtilService,
    private router: Router,
    private app: AppComponent
  ) {
    this.treeNodeService.getTreeNodes().subscribe(nodes => this.dataSource.data = <TreeNode[]>nodes);
    this.productService.getAllProductTypes().subscribe(data => {
      this.shopData = data as ProductType[];
      this.filteredData = data as ProductType[];
    })
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
  }

  addToCart(product: Product, value: string) {
    this.util.addToCart(product, value);

    if(sessionStorage.getItem('tempCart') != null){
      this.app.updateValuesFromStorage();
    }
  }

  filterByProductType(id: number){
    for(let productType of this.shopData){
      if(productType.id == id){
        this.removeFilterMessage = productType.name.valueOf();
        let filter:ProductType[] = [];
        filter.push(productType);
        this.filteredData = filter
      }
    }
  }

  filterByCategory(id: number){
    let filter:ProductType[] = [];
    let filterCat:Category[] = [];
    for(let productType of this.shopData){
      for(let category of productType.categories){
        if(category.id == id){
          this.removeFilterMessage = productType.name + " -> " + category.name;
          filterCat.push(category);
          filter.push(new ProductType(0,"",filterCat,true));
          this.filteredData = filter;
        }
      }
    }
  }

  clearFilter(){
    this.removeFilterMessage = "";
    this.filteredData = this.shopData;
  }

  goToProductView(id: number){
    this.router.navigate(["/product/"+id]).then();
  }
}
