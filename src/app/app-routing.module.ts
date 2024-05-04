import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserLoginComponent } from "./components/usersmanagement/login-user/user-login.component";
import { RegisterUserComponent } from "./components/usersmanagement/register-user/register-user.component";
import { HomeComponent } from "./components/home/home.component";
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
import { ProfileBackComponent } from "./components/usersmanagement/profile-back/profile-back.component";
import {GetAllWComponent} from "./components/workshop-management/get-all-w/get-all-w.component";
import {AjoutWComponent} from "./components/workshop-management/ajout-w/ajout-w.component";
import {UpdateWComponent} from "./components/workshop-management/update-w/update-w.component";
import {ListReservationComponent} from "./components/reservation-management/list-reservation/list-reservation.component";
import {GetByIdWorkshopComponent} from "./components/workshop-management/get-by-id-workshop/get-by-id-workshop.component";
import { ListWComponent } from './components/dashboard-Workshop/list-w/list-w.component';
import { DAjoutWComponent } from "./components/dashboard-Workshop/dajout-w/dajout-w.component";
import { DUpdateWComponent } from "./components/dashboard-Workshop/dupdate-w/dupdate-w.component";
import { DGetByIdWComponent } from './components/dashboard-Workshop/dget-by-id-w/dget-by-id-w.component';
import {ListComponent} from "./components/forum/list/list.component";
//" "./components/forum/update-answer/update-answer.component";
import {AjoutPostComponent} from "./components/forum/ajout-post/ajout-post.component";
import {UpdateComponent} from "./components/forum/update/update.component";
import {ListReponsesComponent} from "./components/forum/list-reponses/list-reponses.component";
import {AddAnswerComponent} from "./components/forum/add-answer/add-answer.component";
import {UpdateAnswerComponent} from"./components/forum/update-answer/update-answer.component";
import {ChatbotComponent} from"./components/forum/chatbot/chatbot.component";
import {ChatbotResponseComponent} from "./components/forum/chatbot-response/chatbot-response.component";
import {AjoutPost2Component} from "./components/forum/ajout-post2/ajout-post2.component";
import {RecherchePComponent} from "./components/forum/recherche-p/recherche-p.component";
// "./components/forum/recherche-p/recherche-p.component";
import {DashboardPostComponent} from "./components/dashboardP/dashboard-post/dashboard-post.component";
import {DashAnswersComponent} from "./components/dashboardP/dash-answers/dash-answers.component";


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
  { path: "profile", component: ProfileComponent, canActivate: [authGuard,RoleGuard], data: { title: "Profile" , role: "USER" } },
  { path: "adminProfile", component: ProfileBackComponent, canActivate: [authGuard,RoleGuard], data: { title: "Profile" , role: "ADMIN" } },
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

    {path: 'listRes', component: ListReservationComponent},
  {path: 'list', component: GetAllWComponent},
  {path: 'list/:id', component: GetByIdWorkshopComponent},
  {path: 'add', component: AjoutWComponent},
  { path: 'update/:id', component: UpdateWComponent },
    { path: 'DlistW', component: ListWComponent},
  { path: 'DAjoutW', component: DAjoutWComponent},
  { path: 'DUpdate/:id', component: DUpdateWComponent},
  { path: 'Dlist/:id', component: DGetByIdWComponent},
  { path: 'rechercherP', component: RecherchePComponent},
  { path: 'ajout2', component: AjoutPost2Component},
  { path: 'chatbotR', component: ChatbotResponseComponent },
  { path: 'chatbot', component: ChatbotComponent },
  {path:'AddReponse/:id', component: AddAnswerComponent},
  {path:'reponseParId/:id', component: ListReponsesComponent},
  {path:'listP', component: ListComponent},
  {path:'ajout', component: AjoutPostComponent},
  {path:'updateP/:id', component: UpdateComponent},
  {path:'updateReponse/:id', component: UpdateAnswerComponent},
  { path: 'DList', component: DashboardPostComponent},
  { path: 'DAnswer/:id', component: DashAnswersComponent},
    { path: "error", component: Error404Component, data: { title: "Error" } },
  { path: "**", component: Error404Component, data: { title: "Error" } }, //this needs to be last component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
