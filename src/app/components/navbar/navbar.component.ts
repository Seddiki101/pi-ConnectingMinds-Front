import { Component } from '@angular/core';
import { AuthenticService } from 'src/app/service/usermanagement/guard/authentic.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authenticService: AuthenticService) {}


  logout() {
    this.authenticService.endSession();
  }
  

}
