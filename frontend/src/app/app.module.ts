import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CheckListComponent } from './check-list/check-list.component';
import { CheckListItemComponent } from './check-list-item/check-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckListComponent,
    CheckListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
