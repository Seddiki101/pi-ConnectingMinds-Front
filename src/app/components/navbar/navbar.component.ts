import { Component } from '@angular/core';
import { AuthenticService } from 'src/app/service/usermanagement/authentic/authentic.service';
import { TokenService } from 'src/app/service/usermanagement/token-svc/token-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
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
  

}
