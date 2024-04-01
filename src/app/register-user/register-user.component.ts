import { Component } from '@angular/core';
import { User } from '../service/user';
import { UserRegister } from '../service/userRegister';
import { RegisterService } from '../service/register.service';
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
}
