import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NewGoalModalComponent } from './new-goal-modal/goal-item-modal.component';
import { TextCellComponent } from '../shared/text-cell.component';
import { GoalPeriodSelectorComponent } from './period-cell.component';
import { GoalService } from '../services/goal.service';
import { GoalItem, GoalType, goalTypes } from '../models/goal.model';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule, TextCellComponent, NewGoalModalComponent, GoalPeriodSelectorComponent, DatePipe],
  templateUrl: './goals.component.html',
  styleUrls: ['../app.component.css']
})
export class GoalsComponent {

  goalItems: GoalItem[][] = [];

  // goalTypeKeys = Object.keys(GoalType).filter( k => typeof GoalType[k as any] === "number");
  // goalTypeIdices = Object.keys(GoalType).filter( k => typeof GoalType[k as any] !== "number");


  //TODO: There must be a better way to make goalTypes available to the template
  public goalTypes = goalTypes;

  constructor(private goalService: GoalService) {

    goalService.goalItems.subscribe((items: GoalItem[]) => {

      if (!items) return;

      console.log(items);

      goalTypes.forEach( (goalType, goalTypeIndex) => {
        console.log(goalTypeIndex);
        console.log(goalType.goalTypeName);
        this.goalItems[goalTypeIndex] = items.filter((item: GoalItem) => item.goalType === goalType.goalTypeName);
      });

      // console.log(this.goalItems[0][0].goalDate.getFullYear());
      console.log(this.goalItems);

    });


   }

  async onSaveItem(item: any) {

    console.log(item);

    // try {

    //   // Ensure item has an itemId
    //   if (!item.itemId) {
    //     throw new Error("Item must have an id to be updated.");
    //   }

    //   const currentGoalItem = this.goalItems.find((i: GoalItem) => i.id === item.itemId);

    //   if (!currentGoalItem) {
    //     throw new Error("Item not found for id: " + item.itemId);
    //   }

    //   const goalItem: GoalItem = {
    //     id: currentGoalItem.id,
    //     goalName: item.goalName || currentGoalItem.goalName,
    //     // period: item.period || currentGoalItem.period,
    //     description: item.description || currentGoalItem.description
    //   };

    //   console.log(goalItem);

    //   await this.goalService.updateItem(goalItem.id, goalItem);

    // } catch (error) {
    //   console.error("Error saving item: ", error);
    // }

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



