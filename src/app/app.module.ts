import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/usersmanagement/login-user/user-login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { RegisterUserComponent } from './components/usersmanagement/register-user/register-user.component';
import { HomeComponent } from './components/home/home.component';
import { DashComponent } from './components/dash/dash.component';
import { ForgottenComponent } from './components/usersmanagement/forgotten/forgotten.component';
import { ResetpassComponent } from './components/usersmanagement/resetpass/resetpass.component';
import { ProfileComponent } from './components/usersmanagement/profile/profile.component';
import { ListUserComponent } from './components/usersmanagement/list-user/list-user.component';

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
         ListUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
