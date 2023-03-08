import { ComponentFixture, TestBed } from '@angular/core/testing';

import AssetfromComponent from './assetfrom.component';

describe('AssetfromComponent', () => {
  let component: AssetfromComponent;
  let fixture: ComponentFixture<AssetfromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetfromComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
