import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VendorService } from 'src/app/services/vendor.service';
import { VendorformComponent } from '../forms/vendorform/vendorform.component';
import { FormGroup, FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { EditService, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
})
export class VendorComponent implements OnInit {
  vendors: any = [];
  view: Observable<GridDataResult> | undefined;

  girdState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  formGroup: FormGroup | undefined;
  editService: EditService | undefined;
  editRowIndex: number | undefined;

  constructor(
    private vendorService: VendorService,
    private modalService: NgbModal // @Inject(EditService) editServiceFactory: () => EditService
  ) {
    // this.editService = editServiceFactory();
  }

  ngOnInit(): void {
    this.GetAll();
  }

  openVendorform() {
    this.modalService.open(VendorformComponent);
    this.GetAll();
  }

  GetAll() {
    this.vendorService.GetVendors().subscribe((res) => {
      // this.view = this.editService.pipe(
      //   map(res => process(res,this.girdState))
      // )
      this.vendors = res;
    });
  }
}
