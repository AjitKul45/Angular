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

  vendors: any;

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
    console.log('fetching vendors...');
    this.dashboardService.GetVendors().subscribe((res) => {
      this.vendors = res;
    });
    // this.dashboardService.subject.subscribe((res) =>{
    //   console.log("in Add Asset Subject : "+JSON.stringify(res));
    //   this.asset = res;
    //   console.log(this.asset);
    // })

    this.dashboardService.emitupdateflag.subscribe((res) => {
      console.log('in sub', res);
      if (res) {
        this.dashboardService
          .GetAsset(this.route.snapshot.paramMap.get('id'))
          .subscribe((a) => {
            console.log('getting asset', a);
            this.asset = a;
          });
      }
    });
  }

  SubmitAsset(): void {
    console.log(this.asset.vendorId);
    if (!this.updateflag) {
      this.dashboardService.AddAsset(this.asset).subscribe((response) => {
        console.log(JSON.stringify(this.asset));
        console.log('Asset added successfully');
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.updateflag = false;
      this.dashboardService
        .EditAsset(this.asset.id, this.asset)
        .subscribe((res) => {
          this.router.navigate(['/dashboard/Assets']);
        });
    }
  }
}
