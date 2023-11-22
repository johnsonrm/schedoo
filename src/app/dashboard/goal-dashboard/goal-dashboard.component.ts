import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Goal, goalTypes, StatusTypes } from '../../models/goal.model';
import { User } from '../../models/user.model';
import { Select, Store } from '@ngxs/store';
import { UserActions } from 'src/app/store/actions/user.action';
import { UserStateModel } from '../../store/states/user.state';
import { Observable } from 'rxjs';
import { StatusIconComponent } from '../status-icon.component';
import { GoalItemComponent } from './goal-item.component';
@Component({
  selector: 'app-goal-dashboard',
  standalone: true,
  imports: [CommonModule, StatusIconComponent, GoalItemComponent],
  template: `
  <div class="row">
    <div>
      <h3>Goals for {{ year }}</h3>
      <ng-container *ngFor="let goalItem of goalItems['Annual']; let i = index">
        <goal-item [goal]="goalItem"
          [status]="getItemStatusClass(goalItem.id)"
          [imageName]="getItemStatusImageHref(goalItem.id)"
          [goalTheCurrentWeek]="goalAttrs[goalItem.id].goalTheCurrentWeek">
        </goal-item>
      </ng-container>
      <h3>Goals for {{ monthName }}</h3>
      <ng-container *ngFor="let goalItem of goalItems['Monthly']; let i = index">
        <goal-item [goal]="goalItem"
          [status]="getItemStatusClass(goalItem.id)"
          [imageName]="getItemStatusImageHref(goalItem.id)"
          [goalTheCurrentWeek]="goalAttrs[goalItem.id].goalTheCurrentWeek">
        </goal-item>
      </ng-container>
      <h3>Goals for Week of {{ firstDayOfWeek }}</h3>
      <ng-container *ngFor="let goalItem of goalItems['Weekly']; let i = index">
        <goal-item [goal]="goalItem"
          [status]="getItemStatusClass(goalItem.id)"
          [imageName]="getItemStatusImageHref(goalItem.id)"
          [goalTheCurrentWeek]="goalAttrs[goalItem.id].goalTheCurrentWeek">
        </goal-item>
      </ng-container>
  </div>
</div>
  `,
  styleUrls: ['../dashboard.component.css']
})
export class GoalDashboardComponent {

  @Select((state: {user: UserStateModel}) => state.user.userData) userData$ : Observable<User>;

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

  public StatusTypes = StatusTypes;

  showPopup = false;
  popupStyles = {};

  editingItem: Goal = null;

  goalAttrs: { [id: string]: {
    status: string,
    imageName: string,
    goalTheCurrentWeek: boolean
  }} = {};

  private today: Date = new Date();
  year: number = this.today.getFullYear();
  month: number = this.today.getMonth();
  monthName = this.today.toLocaleString('en-CA', { month: 'long' });
  firstDayOfWeek: string = this.getFirstDayOfWeek(this.today);

  goalTypes = goalTypes;
  goalItems: Goal[][] = [];

  constructor(private store: Store ) {

    this.userData$.subscribe((userData: User) => {

      if (!userData.goals) return;

      goalTypes.forEach( (goalType, goalTypeIndex) => {

        this.goalItems[goalType.goalTypeName] = userData.goals.filter((item: Goal) => item.goalType === goalType.goalTypeName);

        this.goalItems[goalType.goalTypeName]?.forEach((item: Goal) => {

          const goalThisWeek = this.getFirstDayOfWeek(new Date(item.goalDate)) === this.firstDayOfWeek;

          this.goalAttrs[item.id] = {
            status: item.status,
            imageName: ( item.status === StatusTypes.Incomplete || undefined ? 'square' : 'check-square-fill' ),
            goalTheCurrentWeek: goalThisWeek
          };

        });

      });

    });

  }



  onSave(status: StatusTypes = StatusTypes.Incomplete) {

    console.log(this.editingItem);

    if (status !== StatusTypes.Incomplete && this.editingItem) {
      this.editingItem.status = status;
      this.store.dispatch(new UserActions.UpdateGoal(this.editingItem));
    }

    this.editingItem = null;
    this.showPopup = false;

  }

  getFirstDayOfWeek(basedOnDate: Date): string {

    return new Date(
        basedOnDate.getFullYear(),
        basedOnDate.getMonth(),
        basedOnDate.getDate() - (basedOnDate.getDay() || 7) + 1
      ).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long'
      });

  }


  getItemStatusImageHref(goalId: string): string {

    const svgName: string = this.goalAttrs[goalId]?.imageName || 'square';
    return '../../../assets/' + svgName + '.svg#' + svgName;

  }

  getItemStatusClass(goalId: string): string {

    let status = this.goalAttrs[goalId]?.status || StatusTypes.Incomplete;

    status = status.toLowerCase();
    status = status.replace(/\s/g, '');

    return "indicatorIcon " + status;

  }




}
