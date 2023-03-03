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
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxUiLoaderHttpModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [AppComponent, AssetsComponent, VendorComponent, GridComponent],
  imports: [
    BrowserModule,
    GridModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [HttpClient, AssetDetailService, VendorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
