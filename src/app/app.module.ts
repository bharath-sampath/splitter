import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SplitterFormComponent } from './splitter-form/splitter-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    SplitterFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
