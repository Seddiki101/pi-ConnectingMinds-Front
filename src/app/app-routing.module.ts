import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/usersmanagement/login-user/user-login.component';
import { RegisterUserComponent } from './components/usersmanagement/register-user/register-user.component';
import { HomeComponent } from './components/home/home.component';
import { ForgottenComponent } from './components/usersmanagement/forgotten/forgotten.component'; 
import { ResetpassComponent } from './components/usersmanagement/resetpass/resetpass.component';
import { ProfileComponent } from './components/usersmanagement/profile/profile.component';
import { ListUserComponent } from './components/usersmanagement/list-user/list-user.component';

const routes: Routes = [
  {path:'login', component:UserLoginComponent},
  {path:'register',component:RegisterUserComponent},
  {path:'home',component:HomeComponent},
  { path: 'forgot-password', component: ForgottenComponent },
  { path: 'reset-password', component: ResetpassComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'listUser', component: ListUserComponent },
  {path:'',redirectTo:'/login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
