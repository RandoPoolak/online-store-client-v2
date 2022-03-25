import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {TreeNode} from "../../shared/models/TreeNode";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {ProductService} from "../../shared/services/product.service";
import {TreeNodeService} from "../../shared/services/tree-node.service";
import {Product} from "../../shared/models/Product";
import {ProductType} from "../../shared/models/ProductType";

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit {
  treeControl = new NestedTreeControl<TreeNode>(node =>node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  shopData: any;

  constructor(
    private productService: ProductService,
    private treeNodeService: TreeNodeService,
  ) {
    this.treeNodeService.getTreeNodes().subscribe(nodes =>this.dataSource.data = <TreeNode[]>nodes);
    this.productService.getAllProductTypes().subscribe(data => this.shopData = data as ProductType[])
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
  }

  addToCart(product: Product, value: string) {
    console.log(product)
    console.log(value)
  }
}
