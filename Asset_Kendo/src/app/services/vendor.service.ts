import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private http: HttpClient) {}

  GetVendors(): Observable<any> {
    return this.http.get('api/Vendor/GetAllVendors');
  }

  AddVendor(vendor: any): Observable<any> {
    return this.http.post('api/Vendor/AddVendor', vendor);
  }

  getAssetCountByVendor(): Observable<any> {
    return this.http.get('api/Vendor/GetVendorStatus');
  }
}
