import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMenuSettings, RowClassArgs } from '@progress/kendo-angular-grid';
import { filter, from } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { AssetTransactionComponent } from '../../Forms/asset-transaction/asset-transaction.component';
import { IAsset } from '../../Forms/Models/iasset';
import { IVendor } from '../../Forms/Models/ivendor';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AssetsComponent implements OnInit, OnChanges {
  constructor(
    private dashboardService: ApplicationService,
    private notification: NotificationsService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  dropdownMenu = [
    {
      actionName: 'All Assets',
      click: (dataItem: any): void => {
        this.title = 'All Assets';
        this.showAllAssets();
      },
    },
    {
      actionName: 'Assigned Assets',
      click: (dataItem: any): void => {
        this.title = 'Assigned Assets';
        this.showAssignedAsset();
      },
    },
    {
      actionName: 'Unassigned Assets',
      click: (dataItem: any): void => {
        this.title = 'Unassigned Assets';
        this.showUnassignedAsset();
      },
    },
  ];

  assets: any[] = [];
  sort: any[] = [];
  myset = new Set();
  selectModel: string = '';
  searchText!: string;
  @ViewChild('searchString') search!: ElementRef;
  vendors!: IVendor;
  assignFlag: boolean = false;
  btnTitle: string = 'All Assets';
  title: string = 'All Assets';

  public menuSettings: ColumnMenuSettings = {
    lock: true,
    stick: true,
    setColumnPosition: { expanded: true },
    autoSizeColumn: true,
    autoSizeAllColumns: true,
  };
  ngOnInit(): void {
    this.showAllAssets();
    this.dashboardService.getVendors().subscribe((res) => {
      this.vendors = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dashboardService.getAssets().subscribe((res) => {
      this.assets = res;
    });
  }

  /**
   * edting asset and transfer user to edit-asset page with asset-id
   * @param data
   */
  editAsset(e: any) {
    console.log(e.dataItem.id);
    this.dashboardService.emitupdateflag.next(true);

    this.router.navigate(['/dashboard/edit-asset', e.dataItem.id]);
  }

  deleteAsset(e: any): void {
    if (confirm('Are you sure, you want to delete this asset?')) {
      this.dashboardService.deleteAsset(e.dataItem.id).subscribe(
        (res) => {
          this.assets = res;
          this.notification.showSucces('Deleted Asset Successfully');
        },
        (err) => {
          this.notification.showError('Deletion Failed');
        }
      );
    }
  }

  showAllAssets() {
    this.assignFlag = false;
    this.dashboardService.getAssets().subscribe((res) => {
      this.assets = res;
    });
  }

  showUnassignedAsset(): void {
    this.assignFlag = true;
    this.dashboardService.getUnAssignedAssetList().subscribe((res) => {
      this.assets = res;
    });
  }

  showAssignedAsset(): void {
    this.assignFlag = false;

    this.dashboardService.getAssingedAssetList().subscribe((res) => {
      this.assets = res;
    });
  }

  openAssignForm(e: any): void {
    console.log(e);
    this.router.navigate(['/dashboard/assign-asset', e]);
    // this.modalService.open(AssetTransactionComponent);
  }

  // expAsset = (context: RowClassArgs) => {
  //   if (context.dataItem.expiryDate < Date.now()) {
  //     return { gold: true };
  //   } else {
  //     return { green: true };
  //   }
  // };
}
