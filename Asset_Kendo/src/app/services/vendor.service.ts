import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private http: HttpClient) {}

  GetVendors(): Observable<any> {
    return this.http.get('api/Vendor/GetAllVendors');
  }
}
