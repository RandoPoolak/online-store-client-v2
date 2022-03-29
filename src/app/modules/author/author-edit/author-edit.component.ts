import {Component, OnInit} from '@angular/core';
import {Author} from "../../../shared/models/Author";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorService} from "../../../shared/services/author.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  author: Author = {
    active: false,
    firstName: "",
    id: 0,
    lastName: ""
  }
  authorForm = this.formBuilder.group({
    firstName: new FormControl(),
    lastName: new FormControl()
  })

  request_id: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorService: AuthorService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    if(JSON.parse(sessionStorage.getItem('userRole')!) != "ADMIN"){
      this.router.navigate(['/not-allowed']).then();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.request_id = +params['id'];
      this.requestAuthor(this.request_id)
    })
  }

  requestAuthor(id: number) {
    this.authorService.getAuthorById(id).subscribe(value => {
      this.author = <Author>value;
      this.initForm();
    });
  }

  onSubmit(): void{
    this.author.firstName = this.authorForm.value.firstName;
    this.author.lastName = this.authorForm.value.lastName;
    this.authorService.updateAuthor(this.author).subscribe(() => {
      this.router.navigate(['/admin/1']).then(r => console.log("Redirect ->" +r));
    });

  }

  initForm(){
    this.authorForm = this.formBuilder.group({
      firstName: new FormControl(this.author.firstName, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      lastName: new FormControl(this.author.lastName, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])
    })
  }

}
