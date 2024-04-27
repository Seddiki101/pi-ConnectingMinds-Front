import { Component, ElementRef, Renderer2 } from "@angular/core";
import { AuthenticService } from "src/app/service/usermanagement/guard/authentic.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent{
  constructor(
    private renderer: Renderer2,
    private authenticService: AuthenticService
  ) {}

  logout() {
    this.authenticService.endSession();
  }
  toggleSidebar() {
    const dbWrapper = document.getElementById("db-wrapper");
    if (dbWrapper) {
      if (dbWrapper.classList.contains("toggled")) {
        this.renderer.removeClass(dbWrapper, "toggled");
      } else {
        this.renderer.addClass(dbWrapper, "toggled");
      }
    }
  }
}
