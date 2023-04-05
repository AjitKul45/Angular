import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { HttpClient } from '@angular/common/http';
import { ChartModule } from '@progress/kendo-angular-charts';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let http: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    let httpspy = jasmine.createSpyObj('HttpClient', ['get', 'delete', 'post']);

    await TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent],
      imports: [ChartModule],
      providers: [
        {
          provide: HttpClient,
          useValue: httpspy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
