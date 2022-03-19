import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeNewSubComponent } from './product-type-new-sub.component';

describe('ProductTypeNewSubComponent', () => {
  let component: ProductTypeNewSubComponent;
  let fixture: ComponentFixture<ProductTypeNewSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTypeNewSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeNewSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
