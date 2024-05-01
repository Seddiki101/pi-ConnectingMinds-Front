import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserLoginComponent } from "./components/usersmanagement/login-user/user-login.component";
import { RegisterUserComponent } from "./components/usersmanagement/register-user/register-user.component";
import { HomeComponent } from "./pages/home/home.component";
import { ForgottenComponent } from "./components/usersmanagement/forgotten/forgotten.component";
import { ResetpassComponent } from "./components/usersmanagement/resetpass/resetpass.component";
import { ProfileComponent } from "./components/usersmanagement/profile/profile.component";
import { ListUserComponent } from "./components/usersmanagement/list-user/list-user.component";
import { Error404Component } from "./components/error404/error404.component";
import { ChatAppComponent } from "./components/chatmanagement/chat-app/chat-app.component";
import { authGuard } from "./service/usermanagement/guard/auth.guard.ts.service";
import { RoleGuard } from "./service/usermanagement/guard/role.guard.ts.service";
import { ListUser2Component } from "./components/usersmanagement/list-user2/list-user2.component";
import { AccessComponent } from "./components/usersmanagement/access/access.component";
import { DashComponent } from "./components/dash/dash.component";

const routes: Routes = [
  { path: "chat", component: ChatAppComponent, canActivate: [authGuard], data: { title: "Chat" } },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
    data: { title: "Sign-in" },
  },
  { path: "login", component: UserLoginComponent, data: { title: "Sign-in" } },
  {
    path: "register",
    component: RegisterUserComponent,
    data: { title: "Sign-up" },
  },
  { path: "home", component: HomeComponent, canActivate: [authGuard,RoleGuard], data: { title: "Home", role: "USER" } },
  {
    path: "forgot-password",
    component: ForgottenComponent,
    data: { title: "Forget Password" },
  },
  {
    path: "reset-password",
    component: ResetpassComponent,
    data: { title: "Reset Password" },
  },
  { path: "profile", component: ProfileComponent, canActivate: [authGuard], data: { title: "Profile" } },
  {
    path: "dashboard",
    component: DashComponent,
    canActivate: [authGuard,RoleGuard],
    data: { title: "User List" , role: "ADMIN" },
  },{
    path: "listUser",
    component: ListUserComponent,
    canActivate: [authGuard,RoleGuard],
    data: { title: "User List" , role: "ADMIN" },
  },
  {
    path: "listAdmins",
    component: ListUser2Component,
    canActivate: [authGuard,RoleGuard],
    data: { title: "User List" , role: "ADMIN" },
  },
  {
    path: "Access",
    component: AccessComponent,
    canActivate: [authGuard,RoleGuard],
    data: { title: "User List" , role: "ADMIN" },
  },
  { path: "error", component: Error404Component, data: { title: "Error" } },
  { path: "**", component: Error404Component, data: { title: "Error" } }, //this needs to be last component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
