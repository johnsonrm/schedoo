import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { GoalItem, GoalType, goalTypes } from '../../models/goal.model'; //model for goals
import { GoalService } from 'src/app/services/goal.service';  //service for goals

@Component({
  selector: 'app-new-goal-modal',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './goal-item-modal.component.html',
  styleUrls: ['../../app.component.css']
})
export class NewGoalModalComponent {

  private defaultDate: string = new Date().toLocaleDateString('en-CA');

  // private defaultDateFormatted: string;

  private selectedGoalTypeIndex: number = 0;
  private selectedGoalType: string = GoalType[this.selectedGoalTypeIndex];

  // goalTypes = Object.keys(GoalType).filter( k => typeof GoalType[k as any] === "number");

  //TODO: There must be a better way to make goalTypes available to the template
  public goalTypes = goalTypes;

	closeResult = '';

	constructor(private modalService: NgbModal, private goalService: GoalService) {

    // this.defaultDateFormatted = this.datePipe.transform(this.defaultDate, 'yyyy-MM-dd');
    // console.log(this.defaultDateFormatted);
    console.log(this.defaultDate);

  }

	open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  onSelectChange(value: any) {

    this.selectedGoalTypeIndex = value;
    this.selectedGoalType = GoalType[value];

    }

  save(form: NgForm) {

    console.log(form.value);

    this.goalService.addItem({
      id: null,
      goalName: form.value.goalName,
      goalType: goalTypes[form.value.goalType].goalTypeName,
      goalDate: form.value.goalDate,
      description: form.value.description
    });

    this.modalService.dismissAll();

  }

}
