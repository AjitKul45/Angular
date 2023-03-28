import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/shared/services/refresh.service';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  flag: any = localStorage.getItem('flag');

  constructor(public router: Router, private refreshService: RefreshService) {}

  ngOnInit(): void {
    console.log(this.flag);
  }
}
