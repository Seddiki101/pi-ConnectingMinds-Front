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
import { ChatAppComponent } from './components/chatmanagement/chat-app/chat-app.component';
import { ChatSidebarComponent } from './components/chatmanagement/chat-sidebar/chat-sidebar.component';
import { MainChatComponent } from "./components/chatmanagement/main-chat/main-chat.component";
import { SendMessageModalComponent } from "./components/chatmanagement/send-message-modal/send-message-modal.component";
import { UserDetailsComponent } from './components/chatmanagement/user-details/user-details.component';
import { StompService } from "./service/chatmanagement/stomp-service/stomp-service.service";
import { ListResourcesComponent } from './components/resources/list-resources/list-resources.component';
import { ListPopularResourcesComponent } from './components/resources/list-popular-resources/list-popular-resources.component';
import { ListCategoriesComponent } from './components/resources/list-categories/list-categories.component';
import { AjoutResourceComponent } from './components/resources/ajout-resource/ajout-resource.component';
import { DetailResourceComponent } from './components/resources/detail-resource/detail-resource.component';
import { ShowResourceComponent } from './components/resources/show-resource/show-resource.component';
import { MyResourcesComponent } from './components/resources/my-resources/my-resources.component';



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
    ChatAppComponent,
    ChatSidebarComponent,
    MainChatComponent,
    SendMessageModalComponent,
    UserDetailsComponent,
    ListResourcesComponent,
    ListPopularResourcesComponent,
    ListCategoriesComponent,
    AjoutResourceComponent,
    DetailResourceComponent,
    ShowResourceComponent,
    MyResourcesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [StompService],
  bootstrap: [AppComponent],
})
export class AppModule {}
