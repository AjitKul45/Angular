import { Component, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/models';
import { AssetDetailService } from 'src/app/services/asset-detail.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
})
export class AssetsComponent implements OnInit {
  assets: any = [];
  updateFlag: boolean = false;
  constructor(private assetsService: AssetDetailService) {}

  ngOnInit(): void {
    this.assetsService.GetAssets().subscribe((res) => {
      console.log(res);
      this.assets = res;
    });
  }

  createNewAsset() {
    this.updateFlag = true;
    return new Asset();
  }

  EditAsset(asset: Asset) {
    console.log('i update asset');
    console.log(asset);
    this.assetsService.UpdateAsset(asset).subscribe((res) => {
      console.log(res);
    });
  }

  AddAsset(asset: Asset) {
    console.log('in add asset');
    console.log(asset);
    this.assetsService.AddAsset(asset).subscribe((res) => {
      console.log(res);
    });
  }

  editFlag() {
    this.updateFlag = true;
  }

  RemoveAsset(id: number) {
    this.assetsService.DeleteAsset(id).subscribe((res) => {
      console.log(res);
    });
  }
}
