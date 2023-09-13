import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NewGoalModalComponent } from './new-goal-modal/goal-item-modal.component';
import { TextCellComponent } from '../shared/text-cell.component';
import { DateCellComponent } from '../shared/date-cell.component';
import { NumberCellComponent } from '../shared/number-cell.component';
import { GoalPeriodSelectorComponent } from './period-cell.component';
import { GoalService } from '../services/goal.service';
import { GoalItem, GoalType, goalTypes, statusTypes } from '../models/goal.model';
import { StatusCellComponent } from '../shared/status-cell.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule, TextCellComponent, DateCellComponent, NumberCellComponent, StatusCellComponent, NewGoalModalComponent, GoalPeriodSelectorComponent, DatePipe],
  templateUrl: './goals.component.html',
  styleUrls: ['../app.component.css']
})
export class GoalsComponent {

  goalItems: GoalItem[][] = [];

  // goalTypeKeys = Object.keys(GoalType).filter( k => typeof GoalType[k as any] === "number");
  // goalTypeIdices = Object.keys(GoalType).filter( k => typeof GoalType[k as any] !== "number");


  //TODO: There must be a better way to make goalTypes available to the template
  public goalTypes = goalTypes;
  public statusTypes = statusTypes;

  constructor(private goalService: GoalService) {

    goalService.goalItems.subscribe((items: GoalItem[]) => {

      if (!items) return;

      console.log(items);

      // group by goalType, which creates the array of arrays to create multiple tables in the html template
      goalTypes.forEach( (goalType, goalTypeIndex) => {
        this.goalItems[goalTypeIndex] = items.filter((item: GoalItem) => item.goalType === goalType.goalTypeName);
      });

    });

   }

  async onSaveItem(item: any) {

    console.log(item);

    try {

      // Ensure item has an itemId
      if (!item.itemId) {
        throw new Error("Item must have an id to be updated.");
      }

      const currentGoalItem: GoalItem | undefined = this.goalItems
        .map(array => array.find((ii: GoalItem) => ii.id === item.itemId))
        .find(item => item !== undefined);

      if (!currentGoalItem) {
        throw new Error("Item not found for id: " + item.itemId);
      }

      const goalItem: GoalItem = {
        id: currentGoalItem.id,
        goalName: item.goalName || currentGoalItem.goalName,
        goalDate: item.goalDate || currentGoalItem.goalDate,
        goalType: item.goalType || currentGoalItem.goalType,
        priority: item.priority || currentGoalItem.priority,
        status: item.status || currentGoalItem.status,
        description: item.description || currentGoalItem.description
      };

      console.log(goalItem);

      await this.goalService.updateItem(goalItem.id, goalItem);

    } catch (error) {
      console.error("Error saving item: ", error);
    }

  }

  onDeleteItem(itemId: string) {

    // TODO: prompt user to confirm delete

    try {

      this.goalService.deleteItem(itemId);

    } catch (error) {
      console.error("Error deleting item: ", error);
    }

  }


}



