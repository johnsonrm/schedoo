import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { DailyRoutineItem } from '../models/daily.routine.item.model'; //model for daily routine item
import { RoutineScheduleService } from '../services/routine-schedule.service'; //service for daily routine item

@Component({
  selector: 'app-daily-routine-item-modal',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './daily-routine-item-modal.component.html',
  styleUrls: ['./daily-routine-item-modal.component.css']
})
export class DailyRoutineItemModalComponent {
	closeResult = '';

	constructor(private modalService: NgbModal, private dailyRoutineService: RoutineScheduleService) {}

	open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  async save(form: NgForm) {

    const time: Time = form.value.time;
    const duration: number = form.value.duration;
    const description: string = form.value.description;

    const dailyRoutineItem: DailyRoutineItem = new DailyRoutineItem(time, duration, description);

    const newRoutineItem = await this.dailyRoutineService.addItem(dailyRoutineItem);

    // this.dailyRoutineItems.push(dailyRoutineItem);

  }

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
