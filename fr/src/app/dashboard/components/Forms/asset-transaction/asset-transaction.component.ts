import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IAssetTransaction } from '../Models/iasset-transaction';

@Component({
  selector: 'app-asset-transaction',
  templateUrl: './asset-transaction.component.html',
  styleUrls: ['./asset-transaction.component.css'],
})
export class AssetTransactionComponent implements OnInit {
  transaction: IAssetTransaction = {
    userId: 0,
    empId: '',
    email: '',
    userName: '',
    location: '',
    issueDate: '',
    submitDate: '',
    assetId: 0,
    issuedBy: '',
    department: '',
  };
  issuers: any = {};
  assets: any = [];
  constructor(
    private httpClient: HttpClient,
    private dashboardService: ApplicationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.dashboardService.getUserList().subscribe(
      (res) => {
        this.issuers = res;
      },
      (err) => {}
    );
    this.dashboardService.getAssets().subscribe(
      (res) => {
        this.assets = res;
      },
      (err) => {}
    );
  }
  addAssetTransaction() {
    this.dashboardService.assignAsset(this.transaction).subscribe(
      (res) => {
        this.router.navigate([`dashboard`]);
      },
      (error) => console.log(error)
    );
  }
}
