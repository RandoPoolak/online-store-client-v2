import { Component, OnInit } from '@angular/core';
import {Author} from "../../shared/models/Author";
import {AuthorService} from "../../shared/services/author.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors: Author[] = [];
  displayColumns: string[] = ['id','firstName','lastName','isActive','deactivate', 'edit']

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.authorService.getAllAuthors().subscribe(value => this.authors = <Author[]>value)
  }


}
