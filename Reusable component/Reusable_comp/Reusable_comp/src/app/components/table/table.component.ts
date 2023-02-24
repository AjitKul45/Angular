import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { Columns } from 'src/app/model/columns';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() heading: string[] = [];
  @Input() data: any[] = [];
  @Input() class: string = '';
  @Input() tableSize: number = 5;
  @Output() fetch = new EventEmitter();

  page: number = 1;
  count: number = 0;
  // tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  ngOnInit(): void {}

  onTableDataChange(event: any) {
    this.page = event;
    this.fetch.emit();
  }
}
