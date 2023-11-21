import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserActions } from '../store/actions/user.action';
import { Goal, goalTypes, statusTypes } from '../models/goal.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextCellComponent } from '../shared/text-cell.component';
import { DateCellComponent } from '../shared/date-cell.component';
import { NumberCellComponent } from '../shared/number-cell.component';
import { StatusCellComponent } from '../shared/status-cell.component';
import { NewGoalModalComponent } from './new-goal-modal/goal-item-modal.component';
import { GoalPeriodSelectorComponent } from './period-cell.component';
import { User } from '../models/user.model';
import { UserStateModel } from '../store/states/user.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule, TextCellComponent, DateCellComponent, NumberCellComponent, StatusCellComponent, NewGoalModalComponent, GoalPeriodSelectorComponent, DatePipe],
  templateUrl: './goals.component.html',
  styleUrls: ['../app.component.css']
})
export class GoalsComponent {

  @Select((state: {user: UserStateModel}) => state.user.userData) userData$ : Observable<User>;

  goalItems: Goal[][] = [];

  public goalTypes = goalTypes;
  public statusTypes = statusTypes;

  constructor(private store: Store) {

      this.userData$.subscribe((userData: User) => {

        if (!userData.goals) return;

        console.log(userData.goals);

        // TODO: the table is not updating when the data changes

        // group by goalType, which creates the array of arrays to create multiple tables in the html template
        goalTypes.forEach( (goalType, goalTypeIndex) => {
          this.goalItems[goalTypeIndex] = userData.goals.filter((item: Goal) => item.goalType === goalType.goalTypeName);
        });

    });

   }

  async onSaveItem(item: any) {

    try {

      // Ensure item has an itemId
      if (!item.itemId) {
        throw new Error("Item must have an id to be updated.");
      }

      const currentGoalItem: Goal | undefined = this.goalItems
        .map(array => array.find((ii: Goal) => ii.id === item.itemId))
        .find(item => item !== undefined);

      if (!currentGoalItem) {
        throw new Error("Item not found for id: " + item.itemId);
      }

      const goalItem: Goal = {
        id: currentGoalItem.id,
        goalName: item.goalName || currentGoalItem.goalName,
        goalDate: item.goalDate || currentGoalItem.goalDate,
        goalType: item.goalType || currentGoalItem.goalType,
        priority: item.priority || currentGoalItem.priority,
        status: item.status || currentGoalItem.status,
        description: item.description || currentGoalItem.description
      };

      // await this.goalService.updateItem(goalItem.id, goalItem);
      this.store.dispatch(new UserActions.UpdateGoal(goalItem));

    } catch (error) {
      console.error("Error saving item: ", error);
    }

  }

  onDeleteItem(goal: Goal) {

    // TODO: prompt user to confirm delete

    try {

      this.store.dispatch(new UserActions.RemoveGoal(goal));

    } catch (error) {
      console.error("Error deleting item: ", error);
    }

  }


  isDate(dateString: string): boolean {
    if (!dateString) return false;
    const timestamp = Date.parse(dateString);
    return !isNaN(timestamp);
  }


}



