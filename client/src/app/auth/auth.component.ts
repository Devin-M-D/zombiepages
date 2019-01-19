import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ZombieService } from "../shared"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', '../app.component.scss']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  isSubmitting: boolean = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ZombieService: ZombieService
  ) {
    this.authForm = this.fb.group({
      'email': ['downer.devin@gmail.com', Validators.required],
      'password': ['test', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType == "join" ? "Join" : "Login");
      if (this.authType === 'join'){
        this.authForm.addControl('username', new FormControl('', Validators.required));
        this.authForm.addControl('inviteCode', new FormControl('', Validators.required));
      }
    });
  }

  submitForm(){
    this.isSubmitting = true;
    let credentials = this.authForm.value;
    console.log(credentials);
    this.ZombieService.authorize(this.authType, credentials)
    .subscribe(
      data => {
        console.log(data);
        //this.router.navigateByUrl('/');
        this.isSubmitting = false;
      },
      err => {
        console.log(err);
        this.isSubmitting = false;
      }
    );
  }
}
