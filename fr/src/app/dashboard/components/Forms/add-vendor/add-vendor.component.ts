import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IVendor } from 'src/app/dashboard/components/Forms/Models/ivendor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css'],
})
export class AddVendorComponent {
  contactNo: any;

  constructor(
    private applicationService: ApplicationService,

    private router: Router
  ) {}

  vendorForm = new FormGroup({
    id: new FormControl('0'),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z]+([s][a-zA-Z]+)*'),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    contactNo: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      Validators.minLength(10),
    ]),
    registrationDate: new FormControl(
      formatDate(Date.now(), 'yyyy-MM-dd', 'en_US').toString()
    ),
    terminationDate: new FormControl('', [Validators.required]),
  });

  submitVendorDetails() {
    if (this.vendorForm.valid) {
      this.applicationService
        .addVendor(this.vendorForm.value)
        .subscribe((res) => {
          console.log(res);
          this.applicationService.Show('Vendor added successfully');
        });
    }
  }

  get f() {
    return this.vendorForm.controls;
  }
  notify() {
    this.applicationService.Show('Notified success');
  }
}
