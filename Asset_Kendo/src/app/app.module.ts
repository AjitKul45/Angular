import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssetsComponent } from './components/assets/assets.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AssetDetailService } from './services/asset-detail.service';
import { VendorComponent } from './components/vendor/vendor.component';
import { GridComponent } from './components/grid/grid.component';
import { FormsModule } from '@angular/forms';
import { VendorService } from './services/vendor.service';

@NgModule({
  declarations: [AppComponent, AssetsComponent, VendorComponent, GridComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpClient, AssetDetailService, VendorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
