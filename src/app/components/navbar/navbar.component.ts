import { Component, ElementRef, Renderer2 } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  constructor(private renderer: Renderer2) {}

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
