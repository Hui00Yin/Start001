import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterialModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ContentTabComponent } from './content-tab/content-tab.component';
import { ContentService } from './services/content.service';
import { DisplayResourceService } from './services/display-resource.service';
import { DeskComponent } from './desk/desk.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { PCreatorComponent } from './p-creator/p-creator.component';


@NgModule({
  declarations: [
    AppComponent,
    ContentTabComponent,
    DeskComponent,
    RegFormComponent,
    FormContainerComponent,
    PCreatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [ContentService, DisplayResourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
