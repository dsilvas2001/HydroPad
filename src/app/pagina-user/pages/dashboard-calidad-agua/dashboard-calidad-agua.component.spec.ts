import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCalidadAguaComponent } from './dashboard-calidad-agua.component';

describe('DashboardCalidadAguaComponent', () => {
  let component: DashboardCalidadAguaComponent;
  let fixture: ComponentFixture<DashboardCalidadAguaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCalidadAguaComponent]
    });
    fixture = TestBed.createComponent(DashboardCalidadAguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
