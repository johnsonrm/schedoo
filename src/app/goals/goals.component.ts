import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NewGoalModalComponent } from './new-goal-modal/goal-item-modal.component';
import { TextCellComponent } from './text-cell.component';
import { GoalPeriodSelectorComponent } from './period-cell.component';
import { GoalService } from '../services/goal.service';
import { GoalItem } from '../models/goal.model';


@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule, TextCellComponent, NewGoalModalComponent, GoalPeriodSelectorComponent],
  templateUrl: './goals.component.html',
  styleUrls: ['../app.component.css']
})
export class GoalsComponent {

  goalItems: GoalItem[] = [];

  constructor(private goalService: GoalService) {

    goalService.goalItems.subscribe((items: GoalItem[]) => {
      console.log("Received items from goal service: ", items);
      this.goalItems = items;
    });

   }

  async onSaveItem(item: any) {

    console.log(item);

    try {

      // Ensure item has an itemId
      if (!item.itemId) {
        throw new Error("Item must have an id to be updated.");
      }

      const currentGoalItem = this.goalItems.find((i: GoalItem) => i.id === item.itemId);

      if (!currentGoalItem) {
        throw new Error("Item not found for id: " + item.itemId);
      }

      const goalItem: GoalItem = {
        id: currentGoalItem.id,
        goalName: item.goalName || currentGoalItem.goalName,
        period: item.period || currentGoalItem.period,
        description: item.itemDescription || currentGoalItem.description
      };

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
