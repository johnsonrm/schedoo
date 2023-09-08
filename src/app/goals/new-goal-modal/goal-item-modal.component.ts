import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { GoalItem, GoalPeriod } from '../../models/goal.model'; //model for goals
import { GoalService } from 'src/app/services/goal.service';  //service for goals

@Component({
  selector: 'app-new-goal-modal',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './goal-item-modal.component.html',
  styleUrls: ['../../app.component.css']
})
export class NewGoalModalComponent {

	closeResult = '';

	constructor(private modalService: NgbModal, private goalService: GoalService) {}

	open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  async save(form: NgForm) {

    console.log(form);

    const goalName: string = form.value.goalName;
    const period: GoalPeriod = +form.value.period;
    const description: string = form.value.description;

    const goalItem: GoalItem = new GoalItem(goalName, period, description);

    this.goalService.addItem(goalItem);

    this.modalService.dismissAll();

  }

}
