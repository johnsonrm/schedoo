import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { Input } from '@angular/core';
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
export class DailyRoutineModalComponent {

  @Input() dailyRoutineItem: DailyRoutine;

	closeResult = '';

	constructor(private modalService: NgbModal, private store: Store, private routineScheduleService: RoutineScheduleService) {}

	open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  async save(form: NgForm) {

    const time: Time = this.routineScheduleService.convertStringToTime(form.value.time);
    const duration: number = form.value.duration;
    const description: string = form.value.description;

    const dailyRoutine: DailyRoutine = {
      id: null,
      time: time,
      duration: duration,
      description: description,
    };

    this.store.dispatch(new UserActions.AddDailyRoutine(dailyRoutine));

    this.modalService.dismissAll();

  }

}
