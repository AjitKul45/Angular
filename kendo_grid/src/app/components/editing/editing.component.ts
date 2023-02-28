import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Album } from 'src/app/models/model';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css'],
})
export class EditingComponent implements OnInit {
  albums: any = [];
  assets: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos')
      .subscribe((res) => {
        this.albums = res;
      });

    this.http
      .get('https://localhost:7113/api/AssetDetails/GetAllAssetDetails')
      .subscribe((res) => {
        this.assets = res;
      });
  }

  createNewAlbum(): Album {
    return new Album();
  }
}
