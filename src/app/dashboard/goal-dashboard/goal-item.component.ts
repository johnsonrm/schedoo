
import { Component, Input } from '@angular/core';
import { Goal, StatusTypes } from '../../models/goal.model';
import { UserActions } from 'src/app/store/actions/user.action';
import { Store } from '@ngxs/store';
import { StatusIconComponent } from '../status-icon.component';
import { CommonModule } from '@angular/common';
import { NewGoalModalComponent } from '../../goals/new-goal-modal/goal-item-modal.component';

@Component({
  selector: 'goal-item',
  standalone: true,
  styleUrls: ['../../dashboard/dashboard.component.css', '../../../app/app.component.css'],
  imports: [CommonModule, StatusIconComponent, NewGoalModalComponent],
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
    <div class="temp">
      <div class="inline" (click)="togglePopup(goal, $event)">
        <svg [attr.class]="status" viewBox="0 0 16 16">
          <use [attr.href]="imageName" />
        </svg>
      </div>
      <div class="inline">
        <!-- <app-text-cell [itemId]="goalItem.id" [value]="goalItem.description" (save)="onSaveItem($event)" #description fieldName="description"></app-text-cell> -->
        <div class="inline goalDescription" [innerText]="goal.goalName" [title]="goal.description"></div>
        <app-new-goal-modal [goalItem]="goal" ></app-new-goal-modal>
        <button class="btn btn-link btn-sm linkButton" (click)="onDeleteItem(goal)">Delete</button>
      </div>
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
    class: 'statusIconSelect completedlate',
    type: StatusTypes.CompletedLate,
    iconHref: '../../../assets/check-square-fill.svg#check-square-fill',
    title: 'Completed late'
  },
  {
    class: 'statusIconSelect completedNot',
    type: StatusTypes.Failed,
    iconHref: '../../../assets/x-square-fill.svg#x-square-fill',
    title: 'Failed'
  },
  {
    class: 'statusIconSelect incomplete',
    type: StatusTypes.Incomplete,
    iconHref: '../../../assets/square.svg#square',
    title: 'Incomplete'
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

  onSave(status: StatusTypes) {

    if (status && this.goal) {
      this.goal.status = status;
      this.store.dispatch(new UserActions.UpdateGoal(this.goal));
    }

    this.showPopup = false;

  }

  onDeleteItem(goal: Goal) {

    // TODO: prompt user to confirm delete

    try {

      this.store.dispatch(new UserActions.RemoveGoal(goal));

    } catch (error) {
      console.error("Error deleting item: ", error);
    }

  }


}
