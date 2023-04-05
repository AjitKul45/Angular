import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsComponent } from './vendors.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ApplicationService } from 'src/app/services/application.service';
import { GridModule } from '@progress/kendo-angular-grid';
import { of } from 'rxjs';

describe('VendorsComponent', () => {
  let component: VendorsComponent;
  let fixture: ComponentFixture<VendorsComponent>;
  let appService: jasmine.SpyObj<ApplicationService>;
  beforeEach(async () => {
    appService = jasmine.createSpyObj('ApplicationService', [
      'deleteVender',
      ,
    ]);
    await TestBed.configureTestingModule({
      declarations: [VendorsComponent],
      imports: [GridModule],
      providers: [
        {
          provide: ApplicationService,
          useValue: appService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorsComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  let VENDORS = [
    {
      id: 1,
      name: 'DEll',
      contactNo: '12345678',
      address: 'asdfghjkl',
      registrationDate: '2023-02-06T00:00:00',
      terminationDate: '2023-02-06T00:00:00',
    },
    {
      id: 2,
      name: 'DE',
      contactNo: '12345678',
      address: 'asdfghjkl',
      registrationDate: '2023-02-06T00:00:00',
      terminationDate: '2023-02-06T00:00:00',
    },
    {
      id: 3,
      name: 'Digital Providers',
      contactNo: '12345',
      address: 'pune',
      registrationDate: '2023-02-16T00:00:00',
      terminationDate: '2023-03-11T00:00:00',
    },
  ];

  it('should delete the vendor', () => {
    appService.deleteVender.and.returnValue(of(true));

    component.vendors = VENDORS;
    let res = component.deleteVender(VENDORS[2]);
    expect(component.vendors.length).toEqual(2);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
