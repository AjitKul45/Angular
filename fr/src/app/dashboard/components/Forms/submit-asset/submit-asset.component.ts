import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-submit-asset',
  templateUrl: './submit-asset.component.html',
  styleUrls: ['./submit-asset.component.css'],
})
export class SubmitAssetComponent {
  flag: boolean = false;
  transaction!: any;
  email!: string;
  submitDate: Date = new Date();

  constructor(
    private dashboardService: ApplicationService,
    private router: Router
  ) {}
  fetchAssetTransaction() {
    this.dashboardService.getAssetDetailByEmail(this.email).subscribe(
      (res) => {
        this.flag = true;
        this.transaction = res;
      },
      (err) => {}
    );
  }
  submitAsset() {
    this.transaction.submitDate = new Date();
    this.dashboardService
      .submitAsset(this.transaction, this.transaction.id)
      .subscribe(
        (res) => {
          this.router.navigate([`dashboard`]);
        },
        (error) => {}
      );
  }
}
