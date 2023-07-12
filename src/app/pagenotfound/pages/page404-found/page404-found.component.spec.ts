import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page404FoundComponent } from './page404-found.component';

describe('Page404FoundComponent', () => {
  let component: Page404FoundComponent;
  let fixture: ComponentFixture<Page404FoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Page404FoundComponent]
    });
    fixture = TestBed.createComponent(Page404FoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
