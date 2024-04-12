import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetpassService } from '../../service/resetpass-svc/resetpass.service'; // Adjust the path as necessary

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  error: string = '';
  success: string = '';

  constructor(
    private resetpassService: ResetpassService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {
    // Extract the token from URL query parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit(): void {
    this.error = ''; // Reset error message on new submission

    // Check if passwords match
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    // Check password length
    if (this.newPassword.length < 9) {
      this.error = 'Password must be at least 8 characters long.';
      return;
    }

    // Call the service to reset the password
    this.resetpassService.resetPassword(this.token, this.newPassword).subscribe({
      next: (res) => {
        console.log(res);
        this.success = 'Your password has been reset successfully.';
        // Redirect user to login page after successful password reset
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to reset password. Please try again.';
      }
    });
  }
}
