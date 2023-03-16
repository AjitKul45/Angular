import { Component, OnInit } from '@angular/core';
import { LegendLabelsContentArgs } from '@progress/kendo-angular-charts';
import { IntlService } from '@progress/kendo-angular-intl';
import { count, from } from 'rxjs';
import { AssetDetailService } from 'src/app/services/asset-detail.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export default class DashboardComponent implements OnInit {
  constructor(
    private assetService: AssetDetailService,
    private vendorService: VendorService,
    private intl: IntlService
  ) {
    this.labelContent = this.labelContent.bind(this);
  }

  assetsCount: any[] = [];
  assetsByVendorsCount: any[] = [];

  totalAssetCount: number = 0;
  totalVendorCount: number = 0;
  assignedAssetCount: number = 0;
  unassignedAssetCount: number = 0;

  ngOnInit(): void {
    this.assetService.getAssetCount().subscribe((res) => {
      console.log('asset', res);
      this.assetsCount = res;
    });
    this.vendorService.getAssetCountByVendor().subscribe((res) => {
      console.log('vendor', res);
      this.assetsByVendorsCount = res;
    });
    this.assetService.GetAssets().subscribe((res) => {
      from(res)
        .pipe(count())
        .subscribe((r) => {
          console.log('totalAssetCount', r);
          this.totalAssetCount = r;
        });
    });
    this.vendorService.GetVendors().subscribe((res) => {
      from(res)
        .pipe(count())
        .subscribe((c) => {
          console.log('totalVendorCount', c);
          this.totalVendorCount = c;
        });
    });
    this.assetService.getUnassignedAssetsCount().subscribe((r) => {
      this.unassignedAssetCount = r;
    });
  }

  labelContent(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.type} ${this.intl.formatNumber(
      args.dataItem.count,
      '#'
    )}`;
  }
}
