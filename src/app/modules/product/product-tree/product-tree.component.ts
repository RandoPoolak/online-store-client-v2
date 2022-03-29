import {Component, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";
import {TreeNode} from "../../../shared/models/TreeNode";
import {TreeNodeService} from "../../../shared/services/tree-node.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../shared/models/ProductType";


@Component({
  selector: 'app-product-tree',
  templateUrl: './product-tree.component.html',
  styleUrls: ['./product-tree.component.css']
})
export class ProductTreeComponent implements OnInit {
  productType: ProductType = {
    active: true, categories: [], id: 0, name: ""
  };
  productTypeForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required])
  })

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>()

  constructor(
    private treeNodeService: TreeNodeService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) {
    this.updateInfo();
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
  }

  updateInfo(): void {
    this.treeNodeService.getTreeNodesAdmin().subscribe(nodes => {
      this.dataSource.data = <TreeNode[]>nodes;
    })
  }

  onSubmit(): void {
    this.productType.name = this.productTypeForm.value.name;
    this.productService.createProductType(this.productType)
      .subscribe(() => {
        this.productTypeForm.reset();
        this.updateInfo();
      })
  }

  deactivateNode(controller: String, id: number) {
    this.treeNodeService.disableTreeElement(controller, id).subscribe(() => {
      this.updateInfo()
    });
  }

  activateNode(controller: String, id: number) {
    this.treeNodeService.enableTreeElement(controller, id).subscribe(()=>this.updateInfo());
  }

}
