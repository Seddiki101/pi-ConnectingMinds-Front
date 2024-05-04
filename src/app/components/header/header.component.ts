import { Component, OnInit } from '@angular/core';
import { AuthenticService } from 'src/app/service/usermanagement/guard/authentic.service';
import { TokenService } from 'src/app/service/usermanagement/token-svc/token-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string | null = null; 
  email: string | null = null;
  userImage: string | null = 'assets/images/avatar/avatar-1.jpg';


  constructor(private authenticService: AuthenticService, private tokenService: TokenService) {}

  ngOnInit() {
    this.username = this.tokenService.getName(); // Fetch the username on component initialization
    this.email =  this.tokenService.getEmail();
    this.userImage = this.tokenService.getPic();
  }

  logout() {
    this.authenticService.endSession();
  }

/*
  updateUserImage() {
    if (this.username) {
      const firstLetter = this.username[0].toUpperCase(); // Get first letter and make it uppercase
      this.userImage = `assets/profl/${firstLetter}.png`; // Construct the image path
    }
  }
*/


}
