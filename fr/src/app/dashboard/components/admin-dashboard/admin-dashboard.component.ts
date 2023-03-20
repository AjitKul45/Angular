import { Component, OnInit } from '@angular/core';
import { LegendLabelsContentArgs } from '@progress/kendo-angular-charts';
import { IntlService } from '@progress/kendo-angular-intl';
import { count, from } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private applicationService: ApplicationService,
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
    this.applicationService.getAssetCounts().subscribe((res) => {
      console.log('asset', res);
      this.assetsCount = res;
    });
    this.applicationService.getAssetCountByVendor().subscribe((res) => {
      console.log('vendor', res);
      this.assetsByVendorsCount = res;
    });
    this.applicationService.getAssets().subscribe((res) => {
      from(res)
        .pipe(count())
        .subscribe((r) => {
          console.log('totalAssetCount', r);
          this.totalAssetCount = r;
        });
    });
    this.applicationService.getVendors().subscribe((res) => {
      from(res)
        .pipe(count())
        .subscribe((c) => {
          console.log('totalVendorCount', c);
          this.totalVendorCount = c;
        });
    });
    this.applicationService.getUnassignedAssetsCount().subscribe((r) => {
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
