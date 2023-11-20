import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { DailyRoutine, RoutineStatusOptions } from 'src/app/models/daily.routine.model';
import { DailyRoutineComponent } from 'src/app/daily-routine/daily-routine.component';
import { RoutineScheduleService } from 'src/app/services/routine-schedule.service';
import { Select, Store } from '@ngxs/store';
import { UserActions } from 'src/app/store/actions/user.action';
import { UserStateModel } from 'src/app/store/states/user.state';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { isDefined } from '@ng-bootstrap/ng-bootstrap/util/util';

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

  showPopup = false;
  popupStyles = {};

  dailyRoutineAttrs: { [id: string]: {
                      status: string,
                      imageName: string
                    }} = {};

  dailyRoutines: DailyRoutine[] = [];
  editingItem: DailyRoutine = null;

  constructor(private dailyRoutineService: RoutineScheduleService, private store: Store) {

    this.userData$.subscribe((userData: User) => {
      this.dailyRoutines = userData.dailyRoutines;
      this.dailyRoutines?.forEach((item: DailyRoutine) => {
        if (item.dailyStatus?.length !== 0) {
          const itemStatus = item.getRoutineStatusForToday()?.status;
          if (itemStatus) {
            this.dailyRoutineAttrs[item.id] = { status: itemStatus, imageName: ( itemStatus === 'notcompleted' || undefined ? 'x-square-fill' : 'check-square-fill' )};
          }
        }
      });
    });
   }

   togglePopup(dailyRoutineItem: DailyRoutine, event: MouseEvent) {

    this.editingItem = dailyRoutineItem;

    this.showPopup = !this.showPopup;
    if (this.showPopup) {
      this.popupStyles = {
        position: 'fixed',
        left: event.clientX + 'px',
        top: event.clientY + 'px',
      };
    }

  }

  onSave(status: string ) {

    if (status !== "cancel" && this.editingItem) {
      this.store.dispatch(new UserActions.AddOrUpdateDailyRoutineStatus(this.editingItem, status as RoutineStatusOptions));
    }

    this.editingItem = null;
    this.showPopup = false;

  }

  getItemStatusImageHref(dailyRoutineId: string): string {

    const svgName: string = this.dailyRoutineAttrs[dailyRoutineId]?.imageName || 'square';
    return '../../../assets/' + svgName + '.svg#' + svgName;

  }

  getItemStatusClass(dailyRoutineId: string): string {

    return "indicatorIcon " + this.dailyRoutineAttrs[dailyRoutineId]?.status;

  }




}
