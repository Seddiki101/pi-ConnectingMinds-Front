import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserLoginComponent } from "./components/usersmanagement/login-user/user-login.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { RegisterUserComponent } from "./components/usersmanagement/register-user/register-user.component";
import { HomeComponent } from "./pages/home/home.component";
import { DashComponent } from "./pages/dash/dash.component";
import { ForgottenComponent } from "./components/usersmanagement/forgotten/forgotten.component";
import { ResetpassComponent } from "./components/usersmanagement/resetpass/resetpass.component";
import { ProfileComponent } from "./components/usersmanagement/profile/profile.component";
import { ListUserComponent } from "./components/usersmanagement/list-user/list-user.component";
import { Error404Component } from "./components/error404/error404.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { ListComponent } from './components/forum/list/list.component';
import { AjoutPostComponent } from './components/forum/ajout-post/ajout-post.component';
import { UpdateComponent } from './components/forum/update/update.component';
import { ListReponsesComponent } from './components/forum/list-reponses/list-reponses.component';
import { AddAnswerComponent } from './components/forum/add-answer/add-answer.component';
import { UpdateAnswerComponent } from './components/forum/update-answer/update-answer.component';
import { ChatbotComponent } from './components/forum/chatbot/chatbot.component';
import { ChatbotResponseComponent } from './components/forum/chatbot-response/chatbot-response.component';
import { AjoutPost2Component } from './components/forum/ajout-post2/ajout-post2.component';
import { RecherchePComponent } from './components/forum/recherche-p/recherche-p.component';
import { DashboardPostComponent } from './components/dashboardP/dashboard-post/dashboard-post.component';
import { DashAnswersComponent } from './components/dashboardP/dash-answers/dash-answers.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    RegisterUserComponent,
    HomeComponent,
    DashComponent,
    ForgottenComponent,
    ResetpassComponent,
    ProfileComponent,
    ListUserComponent,
    Error404Component,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    NavbarComponent,
    ListComponent,
    AjoutPostComponent,
    UpdateComponent,
    ListReponsesComponent,
    AddAnswerComponent,
    UpdateAnswerComponent,
    ChatbotComponent,
    ChatbotResponseComponent,
    AjoutPost2Component,
    RecherchePComponent,
    DashboardPostComponent,
    DashAnswersComponent,


  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}