import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IAssetTransaction } from '../Models/iasset-transaction';
import { formatDate } from '@angular/common';
import { filter, find, first, from } from 'rxjs';
import { IAsset } from '../Models/iasset';

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
    issueDate: formatDate(new Date(), 'yyyy-MM-dd', 'en_US').toString(),
    submitDate: '',
    assetId: 0,
    issuedBy: '',
    department: '',
  };
  aId: number = 0;
  issuers: any = {};
  assets: IAsset[] = [];
  constructor(
    private httpClient: HttpClient,
    private dashboardService: ApplicationService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.aId = Number(this.activateRoute.snapshot.paramMap.get('id'));

    if (this.aId !== 0) {
      // from(this.assets)
      //   .pipe(
      //     filter((a: IAsset) => {
      //       console.log('in filter');
      //       return a.id == this.aId;
      //     })
      //   )
      //   .subscribe(
      //     (r) => {
      //       console.log(r);
      //     },
      //     (e) => {
      //       console.log(e);
      //     }
      //   );

      this.transaction.assetId = Number(
        this.activateRoute.snapshot.paramMap.get('id')
      );
    }

    this.dashboardService.getUnAssignedAssetList().subscribe(
      (res) => {
        this.assets = res;
      },
      (err) => {}
    );
  }
  addAssetTransaction() {
    this.dashboardService.assignAsset(this.transaction).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate([`dashboard`]);
      },
      (error) => console.log(error)
    );
  }
}
