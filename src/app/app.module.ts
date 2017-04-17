import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterialModule} from '@angular/material';

import { AppComponent } from './app.component';
import { MySidebarComponent } from './my-sidebar/my-sidebar.component';
import { ContentTabComponent } from './content-tab/content-tab.component';
import { ContentService } from './services/content.service';

@NgModule({
  declarations: [
    AppComponent,
    MySidebarComponent,
    ContentTabComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [ContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
