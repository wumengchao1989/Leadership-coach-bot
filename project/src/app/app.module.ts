import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzCardModule } from './components/card';
import { NzButtonModule } from './components/button';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NzCardModule, NzButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
