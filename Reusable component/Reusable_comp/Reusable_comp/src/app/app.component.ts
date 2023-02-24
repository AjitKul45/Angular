import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Reusable_comp';

  headingArray = ['id', 'name', 'email', 'phone', 'website'];
  userList: any[] = [];
  userTableSize = 3;
  classStyle: string = 'table';

  commentHead: string[] = ['postId', 'id', 'name', 'email', 'body'];
  comments: any[] = [];
  commentTableSize = 10;
  vendorStyle: string = 'table table-dark table-striped';

  constructor(private service: AppServiceService) {}

  fetchuser() {
    this.service.fetchUser().subscribe((res: any) => {
      this.userList = res;
    });
  }
  fetchComment() {
    this.service.fetchComments().subscribe((res: any) => {
      this.comments = res;
    });
  }
  ngOnInit(): void {
    this.fetchComment();
    this.fetchuser();
  }
}
