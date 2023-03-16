import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  typesOfAsset: any[] = [];
  constructor(private appService: ApplicationService) {}
  ngOnInit(): void {
    this.appService.getAssetCounts().subscribe((res) => {
      console.log(res);
      this.typesOfAsset = res;
    });
  }
}
