import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StrengthPipe } from './pipes/strength.pipe';
import { PostComponent } from './components/post/post.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, StrengthPipe, PostComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
