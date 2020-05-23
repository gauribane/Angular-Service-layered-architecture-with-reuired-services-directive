import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SharedNgModule} from './shared/shared-ng.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedNgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
