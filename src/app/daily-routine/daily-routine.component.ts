import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DailyRoutine } from '../models/daily.routine.model'; //model for daily routine item
import { User } from '../models/user.model';
import { UserStateModel } from '../store/states/user.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DailyRoutineModalComponent } from './daily-routine-modal/daily-routine-modal.component';
import { TimeCellComponent } from './time-cell.component';
import { DurationCellComponent } from './duration-cell.component';
import { DescriptionCellComponent } from './description-cell.component';
import { RoutineScheduleService } from '../services/routine-schedule.service';
import { UserActions } from '../store/actions/user.action';
@Component({
  selector: 'app-daily-routine',
  standalone: true,
  imports: [CommonModule, FormsModule, DailyRoutineModalComponent, TimeCellComponent, DurationCellComponent, DescriptionCellComponent],
  templateUrl: './daily-routine.component.html',
  styleUrls: ['./daily-routine.component.css', '../app.component.css']
})
export class DailyRoutineComponent {

  @Select((state: {user: UserStateModel}) => state.user.userData) userData$ : Observable<User>;

  dailyRoutineItems: DailyRoutine[] = [];

  constructor(private store: Store, private dailyRoutineService: RoutineScheduleService) {

    this.userData$.subscribe((userData: User) => {
      this.dailyRoutineItems = userData.dailyRoutines;
    });

   }

  async onSaveItem(item: any) {

    try {

      // Ensure item has an itemId
      if (!item.itemId) {
        throw new Error("Item must have an id to be updated.");
      }

      const currentDailyRoutineItem: DailyRoutine = this.dailyRoutineItems.find((i: DailyRoutine) => i.id === item.itemId);

      if (!currentDailyRoutineItem) {
        throw new Error("Item not found for id: " + item.itemId);
      }

      const dailyRoutineItem: DailyRoutine = {
        id: currentDailyRoutineItem.id,
        time: (item.itemTime ? this.dailyRoutineService.convertStringToTime(item.itemTime) : currentDailyRoutineItem.time ),
        duration: item.itemDuration || currentDailyRoutineItem.duration,
        description: item.itemDescription || currentDailyRoutineItem.description
      };

      this.store.dispatch(new UserActions.UpdateDailyRoutine(dailyRoutineItem));

    } catch (error) {
      console.error("Error saving item: ", error);
    }
  }

  onDeleteItem(dailyRoutine: DailyRoutine) {

    // TODO: prompt user to confirm delete

    try {

      this.store.dispatch(new UserActions.RemoveDailyRoutine(dailyRoutine));

    } catch (error) {
      console.error("Error deleting item: ", error);
    }

  }


}
