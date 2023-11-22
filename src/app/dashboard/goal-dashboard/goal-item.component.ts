
import { Component, Input } from '@angular/core';
import { Goal, StatusTypes } from '../../models/goal.model';
import { UserActions } from 'src/app/store/actions/user.action';
import { Store } from '@ngxs/store';
import { StatusIconComponent } from '../status-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'goal-item',
  standalone: true,
  styleUrls: ['../../dashboard/dashboard.component.css'],
  imports: [CommonModule, StatusIconComponent],
  template: `
    <div *ngIf="showPopup" [ngStyle]="popupStyles" class="popupStatus">
      <div class="statusDescriptionLabel">{{ goal.goalName }}</div>
        <status-icon
          *ngFor="let status of statuses"
          [class]="status.class"
          [type]="status.type"
          [iconHref]="status.iconHref"
          [title]="status.title"
          (save)="onSave($event)">
        </status-icon>
    </div>
    <div class="inline">
      <div (click)="togglePopup(goal, $event)">
        <svg [attr.class]="status" viewBox="0 0 16 16">
          <use [attr.href]="imageName" />
        </svg>
      </div>
      <div class="goalDescription" [innerText]="goal.goalName" [title]="goal.description"></div>
    </div>
  `
})
export class GoalItemComponent {

  @Input() goal: Goal;
  @Input() status: string;
  @Input() imageName: string;
  @Input() goalTheCurrentWeek: boolean;

  showPopup = false;
  popupStyles = {};

  public statuses = [{
    class: 'statusIconSelect completedontime',
    type: StatusTypes.CompletedOntime,
    iconHref: '../../../assets/check-square-fill.svg#check-square-fill',
    title: 'Completed on time'
  },
  {
    class: 'statusIconSelect completedearly',
    type: StatusTypes.CompletedEarly,
    iconHref: '../../../assets/check-square-fill.svg#check-square-fill',
    title: 'Completed early'
  },
  {
    class: 'statusIconSelect completedlate',
    type: StatusTypes.CompletedLate,
    iconHref: '../../../assets/check-square-fill.svg#check-square-fill',
    title: 'Completed late'
  },
  {
    class: 'statusIconSelect statusSelectCancel',
    type: null,
    iconHref: '../../../assets/x-square-fill.svg#x-square-fill',
    title: 'Cancel'
  }
]

  constructor(private store: Store ) {

  }

  togglePopup(goal: Goal, event: MouseEvent) {

    console.log(goal);

    this.showPopup = !this.showPopup;
    if (this.showPopup) {
      this.popupStyles = {
        position: 'fixed',
        left: event.clientX + 'px',
        top: event.clientY + 'px',
      };
    }

  }

  onSave(status: StatusTypes = StatusTypes.Incomplete) {

    if (status !== StatusTypes.Incomplete && this.goal) {
      this.goal.status = status;
      this.store.dispatch(new UserActions.UpdateGoal(this.goal));
    }

    this.showPopup = false;

  }


}
