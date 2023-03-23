import { formatDate } from '@angular/common';
import { JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { NotificationsService } from 'src/app/services/notifications.service';
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
    private notification: NotificationsService,
    private route: ActivatedRoute
  ) {}

  vendors: any = [];
  todayDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en_US').toString();
  updateflag: boolean = false;

  asset: IAsset = {
    id: null,
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
        .subscribe(
          (response) => {
            this.updateflag = true;
            this.asset = response;
            this.asset.expiryDate = formatDate(
              this.asset.expiryDate,
              'yyyy-MM-dd',
              'en_US'
            ).toString();
          },
          (err) => {
            console.log(err.message);
          }
        );
    });
  }

  /**
   * if updateflag == flase, asset will be submitted
   * if updateflag == true, asset will be updated
   */
  submitAsset(): void {
    if (!this.updateflag) {
      this.dashboardService.addAsset(this.asset).subscribe(
        (response) => {
          this.notification.showSucces('Asset Added Successfully');
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.notification.showError('Add Asset Failed ');
        }
      );
    } else {
      this.updateflag = false;
      this.dashboardService.editAsset(this.asset.id, this.asset).subscribe(
        (res) => {
          this.notification.showSucces('Update Successfully');
          this.router.navigate(['/dashboard/assets']);
        },
        (err) => {
          this.notification.showError('Edit Asset Failed');
        }
      );
    }
  }
}
