export class TreeNode{
  id: Number;
  name: String;
  parent: Number;
  controllerUrl: String;
  active: boolean;
  children: TreeNode[];

  constructor(id: Number, name: String, parent: Number, children: TreeNode[], controllerUrl: String, active: boolean) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.children = children;
    this.controllerUrl = controllerUrl;
    this.active = active;
  }
}
