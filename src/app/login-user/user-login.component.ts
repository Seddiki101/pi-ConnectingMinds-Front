import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../service/user';
import { LoginuserService } from '../service/loginuser.service';
import { LoginResponse } from '../responses/LoginResponse';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  user: User = new User();

  constructor(
    private loginuserservice: LoginuserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  userLogin() {
    console.log(this.user);
    this.loginuserservice.loginUser(this.user).subscribe(
      ( data: LoginResponse ) => {


        //console.log(data);
        console.log("token \n");
        console.log(data.token);  
        console.log("\n");
        localStorage.setItem('auth_token', data.token);


        alert('login successful');
        this.router.navigate(['/home']);
      },
      (error) => alert('invalid credentials')
    );
  }
}
