import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  @Input() data: any = [];
  @Input() groupable: boolean = false;
  @Input() filterable: boolean = false;
  @Input() sortable: boolean = false;
  @Input() heading: any = [];

  createNew() {}
}
