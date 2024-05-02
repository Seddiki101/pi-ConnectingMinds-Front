import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListResourcesComponent } from './components/resources/list-resources/list-resources.component';
import { ListPopularResourcesComponent } from './components/resources/list-popular-resources/list-popular-resources.component';
import { ListCategoriesComponent } from './components/resources/list-categories/list-categories.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AjoutResourceComponent } from './components/resources/ajout-resource/ajout-resource.component';
import { DetailResourceComponent } from './components/resources/detail-resource/detail-resource.component';
import { ShowResourceComponent } from './components/resources/show-resource/show-resource.component';
import { MyResourcesComponent } from './components/resources/my-resources/my-resources.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ListResourcesComponent,
    ListPopularResourcesComponent,
    ListCategoriesComponent,
    AjoutResourceComponent,
    DetailResourceComponent,
    ShowResourceComponent,
    MyResourcesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
