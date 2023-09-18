import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { DailyRoutineItem } from 'src/app/models/daily.routine.item.model';
import { DailyRoutineComponent } from 'src/app/daily-routine/daily-routine.component';
import { RoutineScheduleService } from 'src/app/services/routine-schedule.service';


@Component({
  selector: 'app-routine-dashboard',
  // standalone: true,
  // imports: [CommonModule, DailyRoutineComponent],
  templateUrl: './routine-dashboard.component.html',
  styleUrls: [
    './routine-dashboard.component.css',
    '../dashboard.component.css'
  ]
})
export class RoutineDashboardComponent {

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

      console.log(this.startTimes);

    });

   }


}
