import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {TreeNode} from "../../shared/models/TreeNode";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {ProductService} from "../../shared/services/product.service";
import {TreeNodeService} from "../../shared/services/tree-node.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  treeControl = new NestedTreeControl<TreeNode>(node =>node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  constructor(private productService: ProductService, private treeNodeService: TreeNodeService) {
    this.treeNodeService.getTreeNodes().subscribe(nodes =>this.dataSource.data = <TreeNode[]>nodes)
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
  }

}
