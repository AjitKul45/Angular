import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  flag: boolean = false;
  login() {
    this.flag = true;
  }
  logout() {
    this.flag = false;
  }
}
