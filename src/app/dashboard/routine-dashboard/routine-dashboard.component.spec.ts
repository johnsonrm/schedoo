import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineDashboardComponent } from './routine-dashboard.component';

describe('RoutineDashboardComponent', () => {
  let component: RoutineDashboardComponent;
  let fixture: ComponentFixture<RoutineDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoutineDashboardComponent]
    });
    fixture = TestBed.createComponent(RoutineDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
