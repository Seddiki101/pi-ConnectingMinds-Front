import { Component } from '@angular/core';
import { AuthenticService } from 'src/app/service/usermanagement/guard/authentic.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authenticService: AuthenticService) {}


  logout() {
    this.authenticService.endSession();
  }

}
