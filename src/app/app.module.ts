import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ListResourcesComponent } from './list-resources/list-resources.component';
import { ListPopularResourcesComponent } from './list-popular-resources/list-popular-resources.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AjoutResourceComponent } from './ajout-resource/ajout-resource.component';
import { DetailResourceComponent } from './detail-resource/detail-resource.component';

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
