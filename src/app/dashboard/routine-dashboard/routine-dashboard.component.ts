import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { DailyRoutine } from 'src/app/models/daily.routine.model';
import { DailyRoutineComponent } from 'src/app/daily-routine/daily-routine.component';
import { RoutineScheduleService } from 'src/app/services/routine-schedule.service';
import { Select } from '@ngxs/store';
import { UserStateModel } from 'src/app/store/states/user.state';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-routine-dashboard',
  standalone: true,
  imports: [CommonModule, DailyRoutineComponent],
  templateUrl: './routine-dashboard.component.html',
  styleUrls: [
    './routine-dashboard.component.css',
    '../dashboard.component.css'
  ]
})
export class RoutineDashboardComponent {

  @Select((state: {user: UserStateModel}) => state.user.userData) userData$ : Observable<User>;

  dailyRoutines: DailyRoutine[] = [];

  constructor(private dailyRoutineService: RoutineScheduleService) {

    this.userData$.subscribe((userData: User) => {
      this.dailyRoutines = userData.dailyRoutines;
    });


   }


}
