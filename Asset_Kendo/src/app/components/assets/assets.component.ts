import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Asset } from '../../models/models';
import { AssetDetailService } from 'src/app/services/asset-detail.service';
import AssetfromComponent from '../forms/assetfrom/assetfrom.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
})
export class AssetsComponent implements OnInit {
  assets: any = [];
  updateFlag: boolean = false;
  constructor(
    private assetsService: AssetDetailService,
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) {}

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
      this.Show();
    });
  }

  AddAsset(asset: Asset) {
    console.log('in add asset');
    console.log(asset);
    this.assetsService.AddAsset(asset).subscribe(
      (res) => {
        console.log(res);
        this.Show();
      },
      (error) => {
        this.showError();
      }
    );
  }

  editFlag() {
    this.updateFlag = true;
  }

  RemoveAsset(id: number) {
    if (confirm('Are you sure you want to delete')) {
      this.assetsService.DeleteAsset(id).subscribe((res) => {
        console.log(res);
        this.Show();
      });
    }
  }

  Show(): void {
    this.notificationService.show({
      content: 'Success notification',
      hideAfter: 1000,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 1000 },
      type: { style: 'success', icon: true },
    });
  }

  showError(): void {
    this.notificationService.show({
      content: 'Error notification',
      hideAfter: 600,
      position: { horizontal: 'right', vertical: 'bottom' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'error', icon: true },
    });
  }

  openform() {
    const modalref = this.modalService.open(AssetfromComponent);
  }
}
