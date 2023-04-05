import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorComponent } from './add-vendor.component';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ActivatedRoute } from '@angular/router';

describe('AddVendorComponent', () => {
  let component: AddVendorComponent;
  let fixture: ComponentFixture<AddVendorComponent>;
  let http: jasmine.SpyObj<HttpClient>;
  let notification: jasmine.SpyObj<NotificationsService>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  beforeEach(async () => {
    let httpspy = jasmine.createSpyObj('HttpClient', ['get', 'delete', 'post']);
    let noti = jasmine.createSpyObj('NotificationsService', ['showSucces']);
    let actRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    await TestBed.configureTestingModule({
      declarations: [AddVendorComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: httpspy,
        },
        {
          provide: NotificationsService,
          useValue: noti,
        },
        {
          provide: ActivatedRoute,
          useValue: actRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
