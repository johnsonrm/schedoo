import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Goal, goalTypes, StatusTypes } from '../../models/goal.model';
import { TextCellComponent } from 'src/app/shared/text-cell.component';
import { DateCellComponent } from 'src/app/shared/date-cell.component';
import { User } from '../../models/user.model';
import { Select, Store } from '@ngxs/store';
import { UserActions } from 'src/app/store/actions/user.action';
import { UserStateModel } from '../../store/states/user.state';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-goal-dashboard',
  standalone: true,
  imports: [CommonModule, TextCellComponent, DateCellComponent],
  templateUrl: './goal-dashboard.component.html',
  styleUrls: ['../dashboard.component.css']
})
export class GoalDashboardComponent {

  @Select((state: {user: UserStateModel}) => state.user.userData) userData$ : Observable<User>;

  public StatusTypes = StatusTypes;

  showPopup = false;
  popupStyles = {};

  editingItem: Goal = null;

  goalAttrs: { [id: string]: {
    status: string,
    imageName: string
  }} = {};

  private today: Date = new Date();
  year: number = this.today.getFullYear();
  month: number = this.today.getMonth();
  monthName = this.today.toLocaleString('en-CA', { month: 'long' });
  goalTypes = goalTypes;
  goalItems: Goal[][] = [];

  constructor(private store: Store ) {

    this.userData$.subscribe((userData: User) => {

      if (!userData.goals) return;

      goalTypes.forEach( (goalType, goalTypeIndex) => {
        this.goalItems[goalTypeIndex] = userData.goals.filter((item: Goal) => item.goalType === goalType.goalTypeName);
        this.goalItems[goalTypeIndex]?.forEach((item: Goal) => {
          this.goalAttrs[item.id] = {
            status: item.status,
            imageName: ( item.status === StatusTypes.Incomplete || undefined ? 'square' : 'check-square-fill' )};
        });

      });

    });

  }

  togglePopup(goal: Goal, event: MouseEvent) {

    this.editingItem = goal;

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

    console.log(status);

    if (status !== StatusTypes.Incomplete && this.editingItem) {
      this.editingItem.status = status;
      this.store.dispatch(new UserActions.UpdateGoal(this.editingItem));
    }

    this.editingItem = null;
    this.showPopup = false;

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
