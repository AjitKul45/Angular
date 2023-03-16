import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Route, Router } from '@angular/router';
import { filter, from } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { IAsset } from '../../Forms/Models/iasset';
import { IVendor } from '../../Forms/Models/ivendor';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
})
export class AssetsComponent implements OnInit, OnChanges {
  constructor(
    private dashboardService: ApplicationService,
    private router: Router
  ) {}

  assets: any[] = [];
  sort: any[] = [];
  myset = new Set();
  selectModel: string = '';
  searchText!: string;
  @ViewChild('searchString') search!: ElementRef;
  vendors!: IVendor;

  ngOnInit(): void {
    this.dashboardService.getAssets().subscribe((res) => {
      this.assets = res;
      for (let i = 0; i < this.assets.length; i++) {
        if (!this.myset.has(this.assets[i].model)) {
          this.myset.add(this.assets[i].model);
        }
      }
    });

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
  editAsset(data: number) {
    this.dashboardService.emitupdateflag.next(true);

    this.router.navigate(['/dashboard/edit-asset', data]);
  }

  deleteAsset(value: any): void {
    if (confirm('Are you sure, you want to delete this asset?')) {
      this.dashboardService.deleteAsset(value).subscribe((res) => {
        this.assets = res;
      });
    }
  }

  sortByModel() {
    this.dashboardService.getAssets().subscribe((res) => {
      this.sort = [];
      this.assets = res;

      //use filters
      let x = from(this.assets).pipe(
        filter(
          (assetsFlter) =>
            assetsFlter.model.toLowerCase() === this.selectModel.toLowerCase()
        )
      );
      //subscribe to pipe of filter
      x.subscribe((result) => {
        this.sort.push(result);
      });
      this.assets = this.sort;
      if (this.selectModel.toLowerCase() === 'all' || this.selectModel === '') {
        this.assets = res;
      }
    });
  }

  searchBox() {
    this.selectModel = this.search.nativeElement.value;
    this.sortByModel();
  }
}
