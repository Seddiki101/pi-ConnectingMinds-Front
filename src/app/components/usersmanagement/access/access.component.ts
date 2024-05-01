import { Component } from '@angular/core';
import { ListUserService } from 'src/app/service/usermanagement/listUserSvc/list-user-service.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent {
  email: string = "";
  error = "";
  success = "";

  constructor(private listUserService: ListUserService) {}

  giveAccess() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      this.error = "Please enter a valid email address";
      this.success = "";
      return;
    }
  
    this.error = "";
    this.listUserService.giveAccess(this.email).subscribe({
      next: (response) => {
        this.success = "Access request is being processed.";
        this.email = "";
        alert('Access request is being processed.');  // Alert the user on success
      },
      error: (err) => {
        this.error = "Failed to process the request.";
        console.error('Error occurred:', err);
      }
    });
  }
  
  
}
