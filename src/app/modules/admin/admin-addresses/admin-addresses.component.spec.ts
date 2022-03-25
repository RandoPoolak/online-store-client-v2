import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddressesComponent } from './admin-addresses.component';

describe('AdminAddressesComponent', () => {
  let component: AdminAddressesComponent;
  let fixture: ComponentFixture<AdminAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
