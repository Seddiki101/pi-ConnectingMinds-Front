import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userLogin } from '../../../service/usermanagement/requestTypes/userLogin';
import { LoginuserService } from '../../../service/usermanagement/login-svc/loginuser.service';
import { LoginResponse } from '../../../service/usermanagement/responses/LoginResponse';
import { TokenService } from 'src/app/service/usermanagement/token-svc/token-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  user: userLogin = new userLogin();
  rememberMe: boolean = false;

  constructor(
    private loginuserservice: LoginuserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {

    if (this.tokenService.isTokenValid()) {
      console.log("token valid  "+this.tokenService.getUserRole());

      
      if(this.tokenService.getUserRole() == "USER" ){
        this.router.navigate(['/home']);
      }
      else if(this.tokenService.getUserRole() == "ADMIN" ){
            this.router.navigate(['/dashboard']);
      }
            
      else this.router.navigate(['error']);
    }
    else console.log("token not valid");

  }


  userLogin() {
    //console.log(this.user);
    this.loginuserservice.loginUser(this.user).subscribe(
      (data: LoginResponse) => {

        this.tokenService.useLocalStorage = this.rememberMe;
        console.log("remember me " + this.rememberMe ) ;
        this.tokenService.token = data.token; 
         console.log("this is wiw "+data.token);
        alert('Login successful');
        
        if (this.tokenService.isTokenValid()) {
          if(this.tokenService.getUserRole() == "USER" ){
            this.router.navigate(['/home']);
          }
          else if(this.tokenService.getUserRole() == "ADMIN" ){
                this.router.navigate(['/dashboard']);
          }
                
          else this.router.navigate(['error']);
        }



      },
      (error) => alert('Invalid credentials')
    );
  }


}
