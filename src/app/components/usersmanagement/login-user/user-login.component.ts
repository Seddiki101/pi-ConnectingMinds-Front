import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { userLogin } from "../../../service/usermanagement/requestTypes/userLogin";
import { LoginuserService } from "../../../service/usermanagement/login-svc/loginuser.service";
import { LoginResponse } from "../../../service/usermanagement/responses/LoginResponse";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent {
  user: userLogin = new userLogin();

  constructor(
    private loginuserservice: LoginuserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  userLogin() {
    console.log(this.user);
    this.loginuserservice.loginUser(this.user).subscribe(
      (data: LoginResponse) => {
        //console.log(data);
        console.log("token \n");
        console.log(data.token);
        console.log("\n");
        localStorage.setItem("auth_token", data.token);

        //console.log("\n");
        //console.log("uzer  \n");
        //console.log(data.message1 );

        alert("login successful");
        this.router.navigate(["/home"]);
      },
      (error) => alert("invalid credentials")
    );
  }
}
