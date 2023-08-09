import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDiarioComponent } from './report-diario.component';

describe('ReportDiarioComponent', () => {
  let component: ReportDiarioComponent;
  let fixture: ComponentFixture<ReportDiarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportDiarioComponent]
    });
    fixture = TestBed.createComponent(ReportDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
