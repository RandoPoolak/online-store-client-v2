import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddressEditComponent } from './admin-address-edit.component';

describe('AdminAddressEditComponent', () => {
  let component: AdminAddressEditComponent;
  let fixture: ComponentFixture<AdminAddressEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddressEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
