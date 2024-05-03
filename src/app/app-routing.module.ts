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
import {ListComponent} from "./components/forum/list/list.component";
import {AjoutPostComponent} from "./components/forum/ajout-post/ajout-post.component";
import {UpdateComponent} from "./components/forum/update/update.component";
import {ListReponsesComponent} from "./components/forum/list-reponses/list-reponses.component";
import {AddAnswerComponent} from "./components/forum/add-answer/add-answer.component";
import {UpdateAnswerComponent} from "./components/forum/update-answer/update-answer.component";
import {ChatbotComponent} from "./components/forum/chatbot/chatbot.component";
import {ChatbotResponseComponent} from "./components/forum/chatbot-response/chatbot-response.component";
import {AjoutPost2Component} from "./components/forum/ajout-post2/ajout-post2.component";
import {RecherchePComponent} from "./components/forum/recherche-p/recherche-p.component";
import {DashboardPostComponent} from "./components/dashboardP/dashboard-post/dashboard-post.component";
import {DashAnswersComponent} from "./components/dashboardP/dash-answers/dash-answers.component";

const routes: Routes = [
  { path: 'rechercherP', component: RecherchePComponent},
  { path: 'ajout2', component: AjoutPost2Component},
  { path: 'chatbotR', component: ChatbotResponseComponent },
  { path: 'chatbot', component: ChatbotComponent },
  {path:'AddReponse/:id', component: AddAnswerComponent},
  {path:'reponseParId/:id', component: ListReponsesComponent},
  {path:'list', component: ListComponent},
  {path:'ajout', component: AjoutPostComponent},
  {path:'update/:id', component: UpdateComponent},
  {path:'updateReponse/:id', component: UpdateAnswerComponent},
  { path: 'DList', component: DashboardPostComponent},
  { path: 'DAnswer/:id', component: DashAnswersComponent},



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
  { path: "**", component: Error404Component, data: { title: "Error" } },
  // note : don't change the order of this line , this route needs to be always in the bottom

 // {path:'ajout', component: AjoutPostComponent},
  //{path:'update/:id', component: UpdateComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
