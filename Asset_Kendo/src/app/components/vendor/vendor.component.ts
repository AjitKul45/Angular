import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VendorService } from 'src/app/services/vendor.service';
import { VendorformComponent } from '../forms/vendorform/vendorform.component';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor(
    private vendorService: VendorService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.vendorService.GetVendors().subscribe((res) => {
      this.vendors = res;
    });
  }

  openVendorform() {
    this.modalService.open(VendorformComponent);
  }
}
