import { Component } from '@angular/core';
import { UserRegister } from '../../../service/usermanagement/requestTypes/userRegister';
import { RegisterService } from '../../../service/usermanagement/register-svc/register.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/usermanagement/token-svc/token-service.service';

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
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.tokenService.clearToken();
  }

  userRegister() {
    //console.log(this.user);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^\d+$/;


    if (this.user.firstName.length < 3 || this.user.lastName.length < 3) {
      alert('First name and last name must be at least 3 characters long');
      return; // Stop execution if condition is not met
    }

    if (!emailRegex.test(this.user.email)) {
      alert('Please enter a valid email address');
      return;
    }



    if (!phoneRegex.test(this.user.phone)) {
      alert('Phone number must be numeric');
      return; // Stop execution if the phone number is not numeric
    }


    if (this.user.address.length < 4) {
      alert('Address must be at least 4 characters long');
      return; // Stop execution if the address is too short
    }


    if (!this.isAdult(this.user.birthdate)) {
      alert('You must be over the age of 17 to register');
      return;
    }



    if (this.confirmp === this.user.password && this.user.password.length >= 8) {
      this.registerService.registerUser(this.user).subscribe(
        data => {
          alert('Registration successful');
          this.router.navigate(['/login']);
        },
        error => alert('User already exist')
      );
    } else {
      alert("Passwords don't match or are too short");
    }
 
  }

  isAdult(birthDate: Date): boolean {
    const currentDate = new Date();
    const ageDiffMs = currentDate.getTime() - new Date(birthDate).getTime();
    const ageDate = new Date(ageDiffMs);
    return ageDate.getUTCFullYear() - 1970 > 17;
  }


}
