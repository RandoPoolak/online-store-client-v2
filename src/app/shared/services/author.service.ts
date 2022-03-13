import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private AUTHOR_BASE_URL = 'author'

  constructor(private httpClient: HttpClient) { }

  public getAllAuthors(){
    return this.httpClient.get(this.AUTHOR_BASE_URL);
  }
}
