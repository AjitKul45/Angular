import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IVendor } from 'src/app/dashboard/components/Forms/Models/ivendor';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
})
export class VendorsComponent implements OnInit {
  vendors: IVendor[] = [];
  searchText!: string;

  constructor(
    private dashboardService: ApplicationService,
    // private notification: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllVendors();
  }

  getAllVendors() {
    this.dashboardService.getVendors().subscribe((res) => {
      this.vendors = res;
    });
  }

  editVendor(e: any) {
    this.router.navigate(['dashboard/edit-vendor', e.dataItem.id]);
  }
  deleteVender(e: IVendor) {
    console.log(e);
    this.vendors = this.vendors.filter((v) => v.id !== e.id);
    this.dashboardService.deleteVender(e.id).subscribe(
      (res) => {
        this.vendors = res;
        // this.notification.showSucces('Deleted Successfully');
      },
      (err) => {
        console.log(err);
        // this.notification.showError('Deletion Failed');
      }
    );
  }
}
