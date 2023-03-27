import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AssetTransactionComponent } from './components/Forms/asset-transaction/asset-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddAssetComponent } from './components/Forms/add-asset/add-asset.component';
import { AssetsComponent } from './components/pages/assets/assets.component';

import { SubmitAssetComponent } from './components/Forms/submit-asset/submit-asset.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { VendorsComponent } from './components/pages/vendors/vendors.component';
import { AddVendorComponent } from './components/Forms/add-vendor/add-vendor.component';
import { VendorsNamePipe } from '../shared/custom-pipe/vendors-name.pipe';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { MenusModule } from '@progress/kendo-angular-menu';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { GridModule } from '@progress/kendo-angular-grid';
import { NotificationsService } from '../services/notifications.service';
import { PopupComponent } from './components/pages/popup/popup.component';
import { SharedService } from '../services/shared.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { TransactionsComponent } from './components/pages/transactions/transactions.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AssetTransactionComponent,
    AddAssetComponent,
    AssetsComponent,
    SubmitAssetComponent,
    AddVendorComponent,
    VendorsComponent,
    VendorsNamePipe,
    PopupComponent,
    TransactionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    ButtonsModule,
    MenusModule,
    NotificationModule,
    HttpClientModule,
    ChartsModule,
    Ng2SearchPipeModule,
    DashboardRoutingModule,
  ],
  providers: [NotificationsService, SharedService],
})
export class DashboardModule {}
