import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/login-user/user-login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { HomeComponent } from './components/home/home.component';
import { ForgottenComponent } from './components/forgotten/forgotten.component'; 
import { ResetpassComponent } from './components/resetpass/resetpass.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:'login', component:UserLoginComponent},
  {path:'register',component:RegisterUserComponent},
  {path:'home',component:HomeComponent},
  { path: 'forgot-password', component: ForgottenComponent },
  { path: 'reset-password', component: ResetpassComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'',redirectTo:'/login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
