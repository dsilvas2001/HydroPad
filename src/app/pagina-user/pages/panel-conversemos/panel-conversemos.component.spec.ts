import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelConversemosComponent } from './panel-conversemos.component';

describe('PanelConversemosComponent', () => {
  let component: PanelConversemosComponent;
  let fixture: ComponentFixture<PanelConversemosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelConversemosComponent]
    });
    fixture = TestBed.createComponent(PanelConversemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
