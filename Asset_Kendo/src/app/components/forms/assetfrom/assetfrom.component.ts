import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Asset } from 'src/app/models/models';
import { AssetDetailService } from 'src/app/services/asset-detail.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-assetfrom',
  templateUrl: './assetfrom.component.html',
  styleUrls: ['./assetfrom.component.css'],
})
export default class AssetfromComponent implements OnInit {
  constructor(
    private vendorserivce: VendorService,
    private assetservice: AssetDetailService,
    private activeModel: NgbActiveModal,
    private router: Router
  ) {}
  vendors: any = [];
  updateflag: boolean = false;
  todayDate: Date = new Date();
  ngOnInit(): void {
    this.vendorserivce.GetVendors().subscribe((res) => {
      this.vendors = res;
    });
  }
  asset = new Asset();
  SubmitAsset() {
    this.assetservice.AddAsset(this.asset).subscribe((res) => {
      console.log(res);
      this.activeModel.close();
    });
  }
}
