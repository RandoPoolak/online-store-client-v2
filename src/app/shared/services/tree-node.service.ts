import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TreeNodeService {

  private TREE_URL = 'product-type/request-tree';

  constructor(private httpClient: HttpClient) {
  }

  public getTreeNodes() {
    return this.httpClient.get(this.TREE_URL)
  }

  public getTreeNodesAdmin() {
    return this.httpClient.get(this.TREE_URL + "-admin");
  }

  public disableTreeElement(controller: String, id: number) {
    return this.httpClient.get(controller + "/delete/" + id);
  }

  public enableTreeElement(controller: String, id: number) {
    return this.httpClient.get(controller + "/restore/" + id);
  }

}
