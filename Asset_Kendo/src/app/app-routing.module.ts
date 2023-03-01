import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AssetsComponent } from './components/assets/assets.component';
import { VendorComponent } from './components/vendor/vendor.component';

const routes: Routes = [
  {
    path: 'assets',
    component: AssetsComponent,
  },
  {
    path: 'vendors',
    component: VendorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
