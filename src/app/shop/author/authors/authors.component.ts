import {Component, OnInit, ViewChild} from '@angular/core';
import {Author} from "../../../shared/models/Author";
import {AuthorService} from "../../../shared/services/author.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  pageSizes = [10,25,50];
  authors: Author[] = [];
  dataSource = new MatTableDataSource<Author>([]);
  displayColumns: string[] = ['id','firstName','lastName','isActive','deactivate', 'edit']

  constructor(private authorService: AuthorService) { }

  ngOnInit():void {
    this.authorService.getAllAuthors().subscribe(value => {
        this.authors = <Author[]>value;
        this.dataSource.data = this.authors as Author[];
        this.dataSource.paginator = this.paginator;
      });
  }

  deactivateAuthor(id: number):void{
    this.authorService.deactivateAuthor(id)
      .subscribe(() =>{
      this.ngOnInit();
    });
  }

  activateAuthor(id:number):void{
    this.authorService.activateAuthor(id).subscribe(() =>{this.ngOnInit()});
  }
}
