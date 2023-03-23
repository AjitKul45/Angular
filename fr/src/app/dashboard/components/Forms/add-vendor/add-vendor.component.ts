import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IVendor } from 'src/app/dashboard/components/Forms/Models/ivendor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css'],
})
export class AddVendorComponent implements OnInit {
  contactNo: any;
  updateflag: boolean = false;
  vendorForm: FormGroup;
  constructor(
    private applicationService: ApplicationService,
    private notification: NotificationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.vendorForm = new FormGroup({
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
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.updateflag = true;
      console.log(id);
      this.applicationService.getVendorById(id).subscribe(
        (res) => {
          console.log(res);
          this.vendorForm.setValue(res);
        },
        (err) => {
          console.log(err);
          this.notification.showError(err.message.message);
        }
      );
    }
  }
  submitVendorDetails() {
    if (this.vendorForm?.valid) {
      this.applicationService.addVendor(this.vendorForm.value).subscribe(
        (res) => {
          console.log(res);
          this.notification.showSucces('Vendor Added Successfully');
        },
        (err) => {
          this.notification.showError('Vendor Added Falied');
        }
      );
    }
  }

  get f() {
    return this.vendorForm?.controls;
  }
}
