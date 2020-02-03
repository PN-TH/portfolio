import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { GenService } from '../gen.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  authForm = this.fb.group({
  
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    });
  
    User: User = new User();
    invalid= false;
    
    
  constructor(private fb: FormBuilder, private genService : GenService, private authService : AuthService, private router : Router, private userService : UserService) { }

  ngOnInit() {
  }

  onSubmit(ngForm){
    this.User.email = this.authForm.value.email;
    this.User.password = this.authForm.value.password;

    this.authService.login(this.User.email, this.User.password).subscribe(
      result=>{
        this.userService.loadUser().subscribe(result => {
          if(result.role === "admin"){
            this.router.navigateByUrl('/admin')
          }
          else {
            this.router.navigateByUrl('/connectez-vous')
          }
        })
      },
      error => {
        console.log("error", error.error.err)
        this.invalid = true
      }
    );
  }

  onTest(){
    console.log('tata')
    this.User.email = this.authForm.value.email;
    this.User.password = this.authForm.value.password;
    console.log(this.User)
    this.authService.addUser(this.User).subscribe(
      result=>{
        console.log(result)
       })

  }

}
