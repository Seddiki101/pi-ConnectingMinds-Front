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

const routes: Routes = [
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
    data: { title: "Sing-up" },
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
  {
    path: "project-management",
    loadChildren: () => import('./modules/kanban-management/kanban-management.module').then(m => m.KanbanManagementModule)
  },
  { path: "**", component: Error404Component, data: { title: "Error" } }, // note : don't change the order of this line , this route needs to be always in the bottom
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
