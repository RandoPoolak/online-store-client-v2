import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {TreeNode} from "../../shared/models/TreeNode";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {ProductService} from "../../shared/services/product.service";
import {TreeNodeService} from "../../shared/services/tree-node.service";
import {Product} from "../../shared/models/Product";
import {ProductType} from "../../shared/models/ProductType";
import {OrderService} from "../../shared/services/order.service";
import {OrderLine} from "../../shared/models/OrderLine";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/User";

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit {
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  shopData: any;

  constructor(
    private productService: ProductService,
    private treeNodeService: TreeNodeService,
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.treeNodeService.getTreeNodes().subscribe(nodes => this.dataSource.data = <TreeNode[]>nodes);
    this.productService.getAllProductTypes().subscribe(data => this.shopData = data as ProductType[])
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
  }

  addToCart(product: Product, value: string) {
    let userId = 1
    let user;
    this.userService.getUserById(userId).subscribe(request => {
      user = <User>request
      let newOrderLine = new OrderLine(0, product, Number(value),true, user)
      this.orderService.createOrderLine(newOrderLine).subscribe(() => {
        let message = product.description + "=> "+ value +"pc added to cart"
        this.openSnackBar(message, "Done")
      })
    } )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

}
