import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNewSubComponent } from './category-new-sub.component';

describe('CategoryNewSubComponent', () => {
  let component: CategoryNewSubComponent;
  let fixture: ComponentFixture<CategoryNewSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryNewSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNewSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
