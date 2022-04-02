import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../models/Author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private AUTHOR_BASE_URL = 'author';

  constructor(private httpClient: HttpClient) {
  }

  public getAllAuthors() {
    return this.httpClient.get(this.AUTHOR_BASE_URL);
  }

  public getAllActiveAuthors() {
    return this.httpClient.get(this.AUTHOR_BASE_URL+"/active");
  }

  public deactivateAuthor(id: number): Observable<unknown> {
    return this.httpClient.get(this.AUTHOR_BASE_URL + "/delete/" + id)
  }

  public activateAuthor(id: number): Observable<unknown> {
    return this.httpClient.get(this.AUTHOR_BASE_URL + "/restore/" + id);
  }

  public getAuthorById(id: number): Observable<unknown>{
    return this.httpClient.get(this.AUTHOR_BASE_URL + "/" + id)
  }

  public updateAuthor(author: Author) {
    let authorJson = JSON.stringify(author);
    return this.httpClient.post(this.AUTHOR_BASE_URL+"/update", authorJson)
  }

  public createAuthor(author: Author){
    let authorJson = JSON.stringify(author);
    return this.httpClient.post(this.AUTHOR_BASE_URL + "/create", authorJson);
  }
}
