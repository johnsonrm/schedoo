import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRoutineItemModalComponent } from './daily-routine-item-modal.component';

describe('DailyRoutineItemModalComponent', () => {
  let component: DailyRoutineItemModalComponent;
  let fixture: ComponentFixture<DailyRoutineItemModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DailyRoutineItemModalComponent]
    });
    fixture = TestBed.createComponent(DailyRoutineItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
