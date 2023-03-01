import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class AssetDetailService {
  constructor(private http: HttpClient) {}

  GetAssets(): Observable<any> {
    return this.http.get('api/AssetDetails/GetAllAssetDetails');
  }

  UpdateAsset(asset: Asset): Observable<any> {
    return this.http.put(`api/AssetDetails/UpdateAsset/${asset.id}`, asset);
  }

  DeleteAsset(id: number): Observable<any> {
    return this.http.delete(`api/AssetDetails/DeleteAsset/${id}`);
  }

  AddAsset(asset: Asset): Observable<any> {
    return this.http.post(`api/AssetDetails/AddAsset`, asset);
  }
}
