import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LegendLabelsContentArgs } from '@progress/kendo-angular-charts';
import { IntlService } from '@progress/kendo-angular-intl';
import { count, from } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { SharedService } from 'src/app/services/shared.service';
import { AssetsComponent } from '../pages/assets/assets.component';
import { PopupComponent } from '../pages/popup/popup.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private applicationService: ApplicationService,
    private modalService: NgbModal,
    private intl: IntlService,
    private sharedService: SharedService
  ) {
    this.labelContent = this.labelContent.bind(this);
  }
  assetList: any[] = [];
  vendorList: any[] = [];
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
      this.assetList = res;
      from(res)
        .pipe(count())
        .subscribe((r) => {
          console.log('totalAssetCount', r);
          this.totalAssetCount = r;
        });
    });
    this.applicationService.getVendors().subscribe((res) => {
      this.vendorList = res;
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

  public onPieChartClick(e: any) {
    console.log(e.dataItem.type);
    const modalRef = this.modalService.open(PopupComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.param = e.dataItem.type;
    modalRef.componentInstance.vList = this.vendorList;
    modalRef.componentInstance.aList = this.assetList;
    modalRef.componentInstance.aFlag = true;
  }

  public onBarChartClick(e: any) {
    console.log(e.category);
    const modalRef = this.modalService.open(PopupComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.param = e.category;
    modalRef.componentInstance.aList = this.assetList;
    modalRef.componentInstance.vList = this.vendorList;
    modalRef.componentInstance.vFlag = true;
  }
}
