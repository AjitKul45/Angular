import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IAsset } from '../dashboard/components/Forms/Models/iasset';
import { IAssetTransaction } from '../dashboard/components/Forms/Models/iasset-transaction';
import { IVendor } from '../dashboard/components/Forms/Models/ivendor';
import { ILogin } from '../users/models/ilogin';
import { IRegister } from '../users/models/iregister';

const headers = { headers: { 'Content-Type': 'application/json' } };

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  // getAssignedAssetList() {
  //   throw new Error('Method not implemented.');
  // }
  constructor(private httpClient: HttpClient) {}

  public subject = new Subject<any>();

  registerUser(register: IRegister): Observable<any> {
    return this.httpClient.post('/api/User', register, headers);
  }

  loginUser(login: ILogin): Observable<any> {
    console.log('login');
    return this.httpClient.post('/api/User/login', login, headers);
  }

  assignAsset(obj: any) {
    console.log(obj);
    return this.httpClient.post(`api/AssetTransaction/AssignAsset`, obj);
  }

  getVendors(): Observable<any> {
    return this.httpClient.get('api/Vendor/GetAllVendors');
  }

  addAsset(asset: IAsset): Observable<any> {
    return this.httpClient.post(`api/AssetDetails/AddAsset`, asset);
  }

  getAssets(): Observable<any> {
    return this.httpClient.get('api/AssetDetails/GetAllAssetDetails');
  }

  deleteAsset(value: any): Observable<any> {
    return this.httpClient.delete(`api/AssetDetails/DeleteAsset/${value}`);
  }
  submitAsset(obj: any, id: number) {
    console.log('Inside submitAsset');
    return this.httpClient.put(`api/AssetTransaction/${id}`, obj);
  }
  getUserList() {
    return this.httpClient.get(`api/User`);
  }
  getAssetDetailByEmail(email: string) {
    return this.httpClient.get(`api/AssetTransaction/get_by_email/${email}`);
  }

  addVendor(vendor: IVendor): Observable<any> {
    return this.httpClient.post(`api/Vendor/AddVendor`, vendor, headers);
  }

  deleteVender(vendor: number): Observable<any> {
    return this.httpClient.delete(`api/Vendor/DeleteVendor/${vendor}`);
  }

  getTransaction(id: number): Observable<any> {
    return this.httpClient.get(
      `api/AssetTransaction/GetAssetTransactionById/${id}`
    );
  }

  getAsset(id: any): Observable<any> {
    return this.httpClient.get(`api/AssetDetails/GetAssetDetails/${id}`);
  }

  /**
   *
   * @param id
   * @param asset
   * @returns
   */
  editAsset(id: any, asset: IAsset): Observable<any> {
    return this.httpClient.put(`api/AssetDetails/UpdateAsset/${id}`, asset);
  }

  emitAsset = new Subject<IAsset>();
  emitupdateflag = new BehaviorSubject<boolean>(false);
  emitTransaction = new Subject<IAssetTransaction>();

  // showMsg(msg: string): void {
  //   this.notificationService.show({
  //     content: 'Success notification',
  //     hideAfter: 1000,
  //     position: { horizontal: 'center', vertical: 'top' },
  //     animation: { type: 'fade', duration: 1000 },
  //     type: { style: 'success', icon: true },
  //   });
  // }

  getAssetCounts(): Observable<any> {
    return this.httpClient.get('api/AssetDetails/GetAssetsCount');
  }

  getUnassignedAssetsCount(): Observable<any> {
    return this.httpClient.get('api/AssetDetails/GetStatus');
  }

  getAssetCountByVendor(): Observable<any> {
    return this.httpClient.get('api/Vendor/GetVendorStatus');
  }

  getUnAssignedAssetList(): Observable<any> {
    return this.httpClient.get('api/AssetDetails/GetListOfUnassignedAsset');
  }

  getAssingedAssetList(): Observable<any> {
    return this.httpClient.get('api/AssetDetails/GetListOfAssignedAsset');
  }

  getVendorById(id: any): Observable<any> {
    return this.httpClient.get(`api/Vendor/GetVendor/${id}`);
  }

  getDetailTransactions(): Observable<any> {
    return this.httpClient.get(`api/AssetTransaction/GetDetailTransactions`);
  }

  deleteTransaction(id: any): Observable<any> {
    return this.httpClient.delete(
      `api/AssetTransaction/DeleteAssetTransaction/${id}`
    );
  }
}
