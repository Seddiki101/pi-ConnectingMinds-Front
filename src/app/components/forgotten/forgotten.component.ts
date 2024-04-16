import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgottenService } from '../../service/forgotten-svc/forgotten.service'; 

@Component({
  selector: 'app-forgotten',
  templateUrl: './forgotten.component.html',
  styleUrls: ['./forgotten.component.css']
})
export class ForgottenComponent {
  email: string = "";
  error = "";
  success = "";

  constructor(private forgottenService: ForgottenService, private router: Router) {}

  onSubmit(): void {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      this.error = "Please enter a valid email address";
      return;
    }

    this.forgottenService.forgotPassword(this.email).subscribe({
      next: (res) => {
        console.log(res);
        this.success = "If the email is registered, you will receive reset instructions.";
        // Optionally navigate to another route
         this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.error = " processing your request ";
        this.router.navigate(['/login']);
      }
    });
  }
}
