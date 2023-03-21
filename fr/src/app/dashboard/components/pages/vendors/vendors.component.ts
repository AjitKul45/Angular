import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IVendor } from 'src/app/dashboard/components/Forms/Models/ivendor';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardService.getVendors().subscribe((res) => {
      this.vendors = res;
    });
  }

  DeleteVender(data: number) {
    this.dashboardService.deleteVender(data).subscribe(
      (res) => {
        this.vendors = res;
        this.dashboardService.Show('Deleted Successfully');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
