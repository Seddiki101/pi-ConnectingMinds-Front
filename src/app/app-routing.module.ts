import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListResourcesComponent } from './list-resources/list-resources.component';

const routes: Routes = [ { path: '' , component: HomeComponent },
{ path: 'list' , component: ListResourcesComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
