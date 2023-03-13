import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Frontend';
  public gridData: any[] = [
    {
      ProductID: 1,
      ProductName: 'Chai',
      UnitPrice: 18,
      Category: {
        CategoryID: 1,
        CategoryName: 'Beverages',
      },
    },
    {
      /*...*/
    },
  ];
}
