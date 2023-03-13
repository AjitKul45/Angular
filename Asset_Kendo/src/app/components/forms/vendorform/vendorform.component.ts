import { formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Vendor } from 'src/app/models/models';
import { SharedService } from 'src/app/services/shared.service';
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
    private shared: SharedService,
    private activeModel: NgbActiveModal,
    private router: Router,
    private notificationService: NotificationService
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
      this.vendorservice.AddVendor(this.vendorForm.value).subscribe((res) => {
        console.log(res);
        this.activeModel.close();
        this.showMsg('Vendor added successfully');
        this.shared.changeState(true);
      });
    }
  }

  get f() {
    return this.vendorForm.controls;
  }

  showMsg(msg: string) {
    this.notificationService.show({
      content: msg,
      hideAfter: 1600,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'success', icon: true },
    });
  }

  FutureDate(current: string, future: string) {
    return (formGroup: FormGroup) => {
      const c1 = formGroup.controls[current];
      const c2 = formGroup.controls[future];

      if (c1.value > c2.value) {
        // future.setErr
      }
    };
  }
}
