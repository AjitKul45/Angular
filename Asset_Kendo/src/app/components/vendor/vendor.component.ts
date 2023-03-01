import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
})
export class VendorComponent implements OnInit {
  vendors: any = [];
  headings: any = [
    'id',
    'name',
    'contactNo',
    'address',
    'registrationDate',
    'terminationDate',
  ];

  constructor(private vendorService: VendorService) {}
  ngOnInit(): void {
    this.vendorService.GetVendors().subscribe((res) => {
      this.vendors = res;
    });
  }
}
