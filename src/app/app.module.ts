import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {GallaryService} from './gallary.service';
import {GallaryDirective} from './gallary.directive';
@NgModule({
  declarations: [
    AppComponent,
    GallaryDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GallaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
