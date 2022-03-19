import { Component, OnInit } from '@angular/core';
import {Author} from "../../../shared/models/Author";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthorService} from "../../../shared/services/author.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-author-new',
  templateUrl: './author-new.component.html',
  styleUrls: ['./author-new.component.css']
})
export class AuthorNewComponent implements OnInit {
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
  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.author.firstName = this.authorForm.value.firstName;
    this.author.lastName = this.authorForm.value.lastName;
    this.authorService.createAuthor(this.author).subscribe(response => {
      this.router.navigate(['/author']).then(r => console.log("Redirect ->" + r));
    });
  }
}
