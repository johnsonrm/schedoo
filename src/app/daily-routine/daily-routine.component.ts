import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DailyRoutineItem } from '../models/daily.routine.item.model'; //model for daily routine item
import { RoutineScheduleService } from '../services/routine-schedule.service'; //service for daily routine item
import { DailyRoutineItemModalComponent } from './daily-routine-item-modal/daily-routine-item-modal.component';
import { TimeCellComponent } from './time-cell.component';
import { DurationCellComponent } from './duration-cell.component';
import { DescriptionCellComponent } from './description-cell.component';
@Component({
  selector: 'app-daily-routine',
  standalone: true,
  imports: [CommonModule, FormsModule, DailyRoutineItemModalComponent, TimeCellComponent, DurationCellComponent, DescriptionCellComponent],
  templateUrl: './daily-routine.component.html',
  styleUrls: ['./daily-routine.component.css', '../app.component.css']
})
export class DailyRoutineComponent {

  dailyRoutineItems: DailyRoutineItem[] = [];
  startTimes: string[] = [];
  endTimes: string[] = [];

  constructor(private dailyRoutineService: RoutineScheduleService) {

    dailyRoutineService.dailyRoutineItems.subscribe((items: DailyRoutineItem[]) => {
      this.dailyRoutineItems = items;

      if (!items) return;

      this.dailyRoutineItems.forEach((item: DailyRoutineItem, i) => {

        this.startTimes[i] = `${item.time.hours.toString().padStart(2,'0')}:${item.time.minutes.toString().padStart(2,'0')}`;
        this.endTimes[i] = dailyRoutineService.calcEndTime(item.time, item.duration);

      });
    });

   }

  async onSaveItem(item: any) {

    try {

      // Ensure item has an itemId
      if (!item.itemId) {
        throw new Error("Item must have an id to be updated.");
      }

      const currentDailyRoutineItem = this.dailyRoutineItems.find((i: DailyRoutineItem) => i.id === item.itemId);

      if (!currentDailyRoutineItem) {
        throw new Error("Item not found for id: " + item.itemId);
      }

      const dailyRoutineItem: DailyRoutineItem = {
        id: currentDailyRoutineItem.id,
        time: item.itemTime || currentDailyRoutineItem.time,
        duration: item.itemDuration || currentDailyRoutineItem.duration,
        status: item.itemStatus || currentDailyRoutineItem.status,
        description: item.itemDescription || currentDailyRoutineItem.description
      };

      await this.dailyRoutineService.updateItem(dailyRoutineItem.id, dailyRoutineItem);

    } catch (error) {
      console.error("Error saving item: ", error);
    }
  }

  onDeleteItem(itemId: string) {

    // TODO: prompt user to confirm delete

    try {

      this.dailyRoutineService.deleteItem(itemId);

    } catch (error) {
      console.error("Error deleting item: ", error);
    }

  }


}
