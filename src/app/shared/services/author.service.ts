import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private AUTHOR_BASE_URL = 'author'

  constructor(private httpClient: HttpClient) {
  }

  public getAllAuthors() {
    return this.httpClient.get(this.AUTHOR_BASE_URL);
  }

  public deactivateAuthor(id: number): Observable<unknown> {
    return this.httpClient.get(this.AUTHOR_BASE_URL + "/delete/" + id)
  }

  public activateAuthor(id: number): Observable<unknown> {
    return this.httpClient.get(this.AUTHOR_BASE_URL + "/restore/" + id);
  }
}
