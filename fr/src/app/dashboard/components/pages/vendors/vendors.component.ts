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
  vendors: any[] = [];
  searchText!: string;

  constructor(
    private dashboardService: ApplicationService,
    private notification: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardService.getVendors().subscribe((res) => {
      this.vendors = res;
    });
  }

  editVendor(e: any) {
    this.router.navigate(['dashboard/edit-vendor', e.dataItem.id]);
  }
  deleteVender(e: any) {
    this.dashboardService.deleteVender(e.dataItem.id).subscribe(
      (res) => {
        this.vendors = res;
        this.notification.showSucces('Deleted Successfully');
      },
      (err) => {
        console.log(err);
        this.notification.showError('Deletion Failed');
      }
    );
  }
}
