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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorService } from './services/vendor.service';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { NotificationModule } from '@progress/kendo-angular-notification';
import AssetfromComponent from './components/forms/assetfrom/assetfrom.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VendorformComponent } from './components/forms/vendorform/vendorform.component';
@NgModule({
  declarations: [
    AppComponent,
    AssetsComponent,
    VendorComponent,
    GridComponent,
    AssetfromComponent,
    VendorformComponent,
  ],
  imports: [
    BrowserModule,
    GridModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NotificationModule,
  ],
  providers: [HttpClient, AssetDetailService, VendorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
