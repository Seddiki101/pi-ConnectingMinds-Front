import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListResourcesComponent } from './components/resources/list-resources/list-resources.component';
import { ShowResourceComponent } from './components/resources/show-resource/show-resource.component';
import { AjoutResourceComponent } from './components/resources/ajout-resource/ajout-resource.component';
import { MyResourcesComponent } from './components/resources/my-resources/my-resources.component';
import { ListCategoriesComponent } from './components/resources/list-categories/list-categories.component';


const routes: Routes = [ { path: '' , component: HomeComponent },
{ path: 'list-categories' , component: ListCategoriesComponent },
{ path: 'list-resources' , component: ListResourcesComponent },
{ path: 'add-resource' , component: AjoutResourceComponent},
{ path: 'my-resources/:id' , component: MyResourcesComponent},
{ path: 'show-resource/:id' , component: ShowResourceComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
