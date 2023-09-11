import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { DailyRoutineItem } from '../../models/daily.routine.item.model'; //model for daily routine item
import { RoutineScheduleService } from '../../services/routine-schedule.service'; //service for daily routine item

@Component({
  selector: 'app-daily-routine-item-modal',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './daily-routine-item-modal.component.html',
})
export class DailyRoutineItemModalComponent {

	closeResult = '';

	constructor(private modalService: NgbModal, private dailyRoutineService: RoutineScheduleService) {}

	open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  async save(form: NgForm) {

    const time: Time = form.value.time;
    const duration: number = form.value.duration;
    const description: string = form.value.description;

    const dailyRoutineItem: DailyRoutineItem = new DailyRoutineItem(time, duration, description);

    this.dailyRoutineService.addItem(dailyRoutineItem);

    this.modalService.dismissAll();

  }

}