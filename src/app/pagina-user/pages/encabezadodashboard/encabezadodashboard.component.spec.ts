import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadodashboardComponent } from './encabezadodashboard.component';

describe('EncabezadodashboardComponent', () => {
  let component: EncabezadodashboardComponent;
  let fixture: ComponentFixture<EncabezadodashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncabezadodashboardComponent]
    });
    fixture = TestBed.createComponent(EncabezadodashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
