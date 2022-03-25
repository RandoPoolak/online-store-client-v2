import {Component, OnInit, ViewChild} from '@angular/core';
import {Author} from "../../../shared/models/Author";
import {AuthorService} from "../../../shared/services/author.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

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

  author: Author = {
    active: true,
    firstName: "",
    id: 0,
    lastName: ""
  }
  authorForm = this.formBuilder.group({
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])
  })

  constructor(private authorService: AuthorService,private formBuilder: FormBuilder,) { }

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

  onSubmit(): void {
    this.author.firstName = this.authorForm.value.firstName;
    this.author.lastName = this.authorForm.value.lastName;
    this.authorService.createAuthor(this.author).subscribe(() => {
      this.ngOnInit()
    });
  }
}
