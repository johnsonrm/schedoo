import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DailyRoutine } from '../../models/daily.routine.model'; //model for daily routine item
import { UserActions } from 'src/app/store/actions/user.action';
import { RoutineScheduleService } from 'src/app/services/routine-schedule.service';

@Component({
  selector: 'app-daily-routine-modal',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './daily-routine-modal.component.html',
  styleUrls: ['../../app.component.css']
})
export class DailyRoutineModalComponent implements OnInit {

  @Input() dailyRoutineItem: DailyRoutine;

  dailyRoutineTime: string = '';

	constructor(private modalService: NgbModal, private store: Store, private routineScheduleService: RoutineScheduleService) {}

  ngOnInit(): void {

    if (!this.dailyRoutineItem) {
      this.setDefaults();
    } else {
      this.dailyRoutineTime = this.setTimeString(this.dailyRoutineItem.time);
    }

  }

  private setDefaults() {
    this.dailyRoutineItem = new DailyRoutine({hours: 6, minutes: 0}, 15, "", [], null);
    this.dailyRoutineTime = this.setTimeString(this.dailyRoutineItem.time);
  }

  private setTimeString(time: Time): string {
    return (time.hours?.toString().padStart(2,'0') + ':' + time.minutes?.toString().padStart(2,'0'));
  }

	open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  async save(form: NgForm) {

    const time: Time = this.routineScheduleService.convertStringToTime(form.value.time);
    const duration: number = form.value.duration;
    const description: string = form.value.description;

    // const dailyRoutine: DailyRoutine = {
    //   id: null,
    //   time: time,
    //   duration: duration,
    //   description: description,
    //   dailyStatus: [],
    // };

    // constructor(time: Time, duration: number, description: string, dailyStatus: RoutineStatus[], id?: string)

    const dailyRoutine = new DailyRoutine(time, duration, description, [], null);

    try {

      if (this.dailyRoutineItem?.id) {

        dailyRoutine.id = this.dailyRoutineItem.id;
        this.store.dispatch(new UserActions.UpdateDailyRoutine(dailyRoutine));

      } else {

        this.store.dispatch(new UserActions.AddDailyRoutine(dailyRoutine));

      }

        this.setDefaults();

        this.modalService.dismissAll();

    } catch (error) {

      console.error("Error saving item: ", error);

      //TODO: display error message to user

    }

  }

}
