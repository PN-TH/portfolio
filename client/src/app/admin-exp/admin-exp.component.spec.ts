import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExpComponent } from './admin-exp.component';

describe('AdminExpComponent', () => {
  let component: AdminExpComponent;
  let fixture: ComponentFixture<AdminExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
