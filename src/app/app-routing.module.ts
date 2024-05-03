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
import { ListResourcesComponent } from './components/resources/list-resources/list-resources.component';
import { ShowResourceComponent } from './components/resources/show-resource/show-resource.component';
import { AjoutResourceComponent } from './components/resources/ajout-resource/ajout-resource.component';
import { MyResourcesComponent } from './components/resources/my-resources/my-resources.component';
import { ListCategoriesComponent } from './components/resources/list-categories/list-categories.component';

const routes: Routes = [
  { path: "chat", component: ChatAppComponent, data: { title: "Chat" } },
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


  { path: 'list-categories' , component: ListCategoriesComponent },
{ path: 'list-resources' , component: ListResourcesComponent },
{ path: 'add-resource' , component: AjoutResourceComponent},
{ path: 'my-resources/:id' , component: MyResourcesComponent},
{ path: 'show-resource/:id' , component: ShowResourceComponent },


  { path: "**", component: Error404Component, data: { title: "Error" } }, // note : don't change the order of this line , this route needs to be always in the bottom
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
