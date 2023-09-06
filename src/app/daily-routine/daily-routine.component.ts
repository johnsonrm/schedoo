import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DailyRoutineItem } from '../models/daily.routine.item.model'; //model for daily routine item
import { RoutineScheduleService } from '../services/routine-schedule.service'; //service for daily routine item
import { DailyRoutineItemModalComponent } from '../daily-routine-item-modal/daily-routine-item-modal.component';

@Component({
  selector: 'app-daily-routine',
  standalone: true,
  imports: [CommonModule, FormsModule, DailyRoutineItemModalComponent],
  templateUrl: './daily-routine.component.html',
  styleUrls: ['./daily-routine.component.css']
})
export class DailyRoutineComponent {

  dailyRoutineItems: DailyRoutineItem[] = [];

  constructor(private dailyRoutineService: RoutineScheduleService) {

    dailyRoutineService.dailyRoutineItems.subscribe((items: DailyRoutineItem[]) => {
      this.dailyRoutineItems = items;
    });

   }

  // async onSubmit(form: NgForm) {

  //   const time: Time = form.value.time;
  //   const duration: number = form.value.duration;
  //   const description: string = form.value.description;

  //   const dailyRoutineItem: DailyRoutineItem = new DailyRoutineItem(time, duration, description);

  //   const newRoutineItem = await this.dailyRoutineService.addItem(dailyRoutineItem);

  //   this.dailyRoutineItems.push(dailyRoutineItem);

  // }

  onDelete(index: number) {
    this.dailyRoutineItems.splice(index, 1);
  }


}
