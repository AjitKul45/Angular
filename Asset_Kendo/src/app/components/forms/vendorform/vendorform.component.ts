import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vendor } from 'src/app/models/models';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendorform',
  templateUrl: './vendorform.component.html',
  styleUrls: ['./vendorform.component.css'],
})
export class VendorformComponent {
  vendor = new Vendor();
  contactNo: any;

  constructor(
    private vendorservice: VendorService,
    private activeModel: NgbActiveModal,
    private router: Router
  ) {}

  vendorForm = new FormGroup({
    id: new FormControl('0'),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    contactNo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    registrationDate: new FormControl(
      formatDate(Date.now(), 'yyyy-MM-dd', 'en_US').toString()
    ),
    terminationDate: new FormControl('', Validators.required),
  });

  get FormControls(): any {
    return this.vendorForm['controls'];
  }

  submitVendorDetails() {
    this.vendorservice.AddVendor(this.vendorForm.value).subscribe((res) => {
      console.log(res);
      // this.router.navigate(['/vendors']);
      this.activeModel.close();
    });
  }
}
