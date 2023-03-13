import { JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IAsset } from '../Models/iasset';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css'],
})
export class AddAssetComponent implements OnInit {
  constructor(
    private dashboardService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  vendors: any = [];

  updateflag: boolean = false;

  asset: IAsset = {
    id: 0,
    tyape: '',
    name: '',
    proprietary: '',
    configuration: '',
    serviceTag: '',
    model: '',
    hostName: '',
    oem: '',
    expiryDate: '',
    owner: '',
    remarks: '',
    ram: '',
    vendorId: 0,
  };

  ngOnInit(): void {
    this.dashboardService.getVendors().subscribe((res) => {
      this.vendors = res;
    });

    this.dashboardService.emitupdateflag.subscribe((res) => {
      this.dashboardService
        .getAsset(this.route.snapshot.paramMap.get('id'))
        .subscribe((a) => {
          this.updateflag = true;
          this.asset = a;
        });
    });
  }

  submitAsset(): void {
    console.log(this.asset.vendorId);
    if (!this.updateflag) {
      this.dashboardService.addAsset(this.asset).subscribe((response) => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.updateflag = false;
      this.dashboardService
        .editAsset(this.asset.id, this.asset)
        .subscribe((res) => {
          this.router.navigate(['/dashboard/Assets']);
        });
    }
  }
}
