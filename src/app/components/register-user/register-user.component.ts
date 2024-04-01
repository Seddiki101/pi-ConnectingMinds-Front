import { Component } from '@angular/core';
import { User } from '../../service/requestTypes/user';
import { UserRegister } from '../../service/requestTypes/userRegister';
import { RegisterService } from '../../service/register-svc/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent {
  user: UserRegister = new UserRegister();
  confirmp: string;
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // this.user.userId = 'hello';
    // this.user.password = 'jjj';
  }

  userRegister() {
    console.log(this.user);
  
    // Regular expression for validating an email address
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    // Check if email format is valid
    if (!emailRegex.test(this.user.email)) {
      alert('Please enter a valid email address');
      return; // Stop execution if the email is not valid
    }
  
    // Continue with your existing code for password confirmation and registration
    if (this.confirmp === this.user.password && this.user.password.length > 0) {
      this.registerService.registerUser(this.user).subscribe(
        (data) => {
          alert('Registration successful');
          this.router.navigate(['/login']);
        },
        (error) => alert('User id already exist')
      );
    } else {
      alert("password doesn't match");
    }
  }
  /*
  userRegister() {
    console.log(this.user);
    if (this.confirmp == this.user.password && this.user.password.length) {
      this.registerService.registerUser(this.user).subscribe(
        (data) => {
          alert('Registration successful');
          this.router.navigate(['/login']);
        },
        (error) => alert('User id already exist')
      );
      // console.log('hello');
    } else {
      alert("password doesn't match");
    }
  }
  */


}
