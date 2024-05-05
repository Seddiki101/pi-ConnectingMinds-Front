import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserLoginComponent } from "./components/usersmanagement/login-user/user-login.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { RegisterUserComponent } from "./components/usersmanagement/register-user/register-user.component";
import { HomeComponent } from "./components/home/home.component";
import { DashComponent } from "./components/dash/dash.component";
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
import { AccessComponent } from './components/usersmanagement/access/access.component';
import { ListUser2Component } from "./components/usersmanagement/list-user2/list-user2.component";
import { ProfileBackComponent } from './components/usersmanagement/profile-back/profile-back.component';
import {AjoutWComponent} from "./components/workshop-management/ajout-w/ajout-w.component";
import {UpdateWComponent} from "./components/workshop-management/update-w/update-w.component";
import {GetAllWComponent} from "./components/workshop-management/get-all-w/get-all-w.component";
import { ReservationModalComponent } from './components/workshop-management/reservation-modal/reservation-modal.component';
import {AddReservationComponent} from "./components/reservation-management/add-reservation/add-reservation.component";
import { GetByIdWorkshopComponent } from './components/workshop-management/get-by-id-workshop/get-by-id-workshop.component';
import { ListReservationComponent } from './components/reservation-management/list-reservation/list-reservation.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ToastrModule} from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListWComponent } from './components/dashboard-Workshop/list-w/list-w.component';
import { DAjoutWComponent } from "./components/dashboard-Workshop/dajout-w/dajout-w.component";
import { DUpdateWComponent } from "./components/dashboard-Workshop/dupdate-w/dupdate-w.component";
import { DGetByIdWComponent } from './components/dashboard-Workshop/dget-by-id-w/dget-by-id-w.component';
import { DlistReservationComponent } from './components/dashboard-reservations/dlist-reservation/dlist-reservation.component';
import { NgxPaginationModule } from 'ngx-pagination';


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
    ListUser2Component,
    AccessComponent,
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
    AccessComponent,
    ProfileBackComponent,
    AjoutWComponent,
    GetAllWComponent,
    UpdateWComponent,
    AddReservationComponent,
    ListReservationComponent,
    ReservationModalComponent,
    GetByIdWorkshopComponent,
        ListWComponent,
    DAjoutWComponent,
    DUpdateWComponent,
    DGetByIdWComponent,
    DlistReservationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, BrowserAnimationsModule, MatDialogModule, 
    MatInputModule,ToastrModule.forRoot(), NgxPaginationModule],
  providers: [StompService],
  bootstrap: [AppComponent],
})
export class AppModule {}
