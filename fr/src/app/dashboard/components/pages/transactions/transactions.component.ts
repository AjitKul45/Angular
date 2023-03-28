import { Component, OnInit } from '@angular/core';
import { ColumnMenuSettings } from '@progress/kendo-angular-grid';
import { ApplicationService } from 'src/app/services/application.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  constructor(
    private appService: ApplicationService,
    private notificationService: NotificationsService
  ) {}
  ngOnInit(): void {
    this.appService.getDetailTransactions().subscribe((data) => {
      console.log(data);
      this.transactions = data;
    });
  }

  public menuSettings: ColumnMenuSettings = {
    lock: true,
    stick: true,
    setColumnPosition: { expanded: true },
    autoSizeColumn: true,
    autoSizeAllColumns: true,
  };

  submitAsset(id: any): void {
    console.log(id);
    if (confirm('Are you sure you want to submit this asset?')) {
      this.appService.deleteTransaction(id).subscribe(
        (data) => {
          this.transactions = data;
          this.notificationService.showSucces('Asset Submitted');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
