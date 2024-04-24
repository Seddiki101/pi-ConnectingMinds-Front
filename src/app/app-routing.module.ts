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
import {GetAllWComponent} from "./pages/workshop-management/get-all-w/get-all-w.component";
import {AjoutWComponent} from "./pages/workshop-management/ajout-w/ajout-w.component";
import {UpdateWComponent} from "./pages/workshop-management/update-w/update-w.component";
import {ListReservationComponent} from "./pages/reservation-management/list-reservation/list-reservation.component";

const routes: Routes = [
  {path: 'listRes', component: ListReservationComponent},

  {path: 'list', component: GetAllWComponent},
  {path: 'add', component: AjoutWComponent},
  { path: 'update/:id', component: UpdateWComponent },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
    data: { title: "Sing-in" },
  },
  { path: "login", component: UserLoginComponent, data: { title: "Sing-in" } },
  {
    path: "register",
    component: RegisterUserComponent,
    data: { title: "Sign-up" },
  },
  { path: "home", component: HomeComponent, data: { title: "Home" } },
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
  { path: "profile", component: ProfileComponent, data: { title: "Profile" } },
  {
    path: "listUser",
    component: ListUserComponent,
    data: { title: "User List" },
  },
  { path: "**", component: Error404Component, data: { title: "Error" } }, // note : don't change the order of this line , this route needs to be always in the bottom
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
