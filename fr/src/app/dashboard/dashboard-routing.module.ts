import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddAssetComponent } from './components/Forms/add-asset/add-asset.component';
import { AddVendorComponent } from 'src/app/dashboard/components/Forms/add-vendor/add-vendor.component';
import { AssetTransactionComponent } from './components/Forms/asset-transaction/asset-transaction.component';
import { SubmitAssetComponent } from './components/Forms/submit-asset/submit-asset.component';
import { AssetsComponent } from './components/pages/assets/assets.component';
import { VendorsComponent } from './components/pages/vendors/vendors.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
  },
  {
    path: 'asset-transaction',
    component: AssetTransactionComponent,
  },
  {
    path: 'assign-asset/:id',
    component: AssetTransactionComponent,
  },
  {
    path: 'add-asset',
    component: AddAssetComponent,
  },
  {
    path: 'assets',
    component: AssetsComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'edit-asset/:id',
    component: AddAssetComponent,
  },
  {
    path: 'add-vendor',
    component: AddVendorComponent,
  },
  {
    path: 'edit-vendor/:id',
    component: AddVendorComponent,
  },
  {
    path: 'show-venders',
    component: VendorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
