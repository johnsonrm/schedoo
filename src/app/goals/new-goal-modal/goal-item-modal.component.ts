import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { GoalItem, GoalType, goalTypes, statusTypes } from '../../models/goal.model'; //model for goals
import { GoalService } from 'src/app/services/goal.service';  //service for goals

@Component({
  selector: 'app-new-goal-modal',
  // standalone: true,
  // imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './goal-item-modal.component.html',
  styleUrls: ['../../app.component.css']
})
export class NewGoalModalComponent implements OnInit {

  @Input() goalItem: GoalItem;

  goalName: string;
  goalType: string;
  priority: number;
  status: string;
  description: string;

  private defaultDate: string = new Date().toLocaleDateString('en-CA');
  private selectedGoalTypeIndex: number = 0;
  private selectedStatusIndex: number = 0;

  private selectedGoalType: string = GoalType[this.selectedGoalTypeIndex];

  //TODO: There must be a better way to make goalTypes available to the template
  public goalTypes = goalTypes;
  public statusTypes = statusTypes;

	closeResult = '';

	constructor(private modalService: NgbModal, private goalService: GoalService) {

  }

  ngOnInit(): void {

    if (!this.goalItem) return;

    this.goalName = this.goalItem.goalName;
    this.goalType = this.goalItem.goalType;
    this.priority = this.goalItem.priority;
    this.status = this.goalItem.status;
    this.description = this.goalItem.description;

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

    if (this.goalItem.id) {

      //update existing item
      this.goalService.updateItem(
        this.goalItem.id,
        { id: null, goalName: form.value.goalName,
        goalType: goalTypes[form.value.goalType].goalTypeName,
        priority: form.value.priority,
        status: statusTypes[form.value.status],
        goalDate: form.value.goalDate,
        description: form.value.description }
      );

    } else {

      // else add a new item
      this.goalService.addItem({
        id: null,
        goalName: form.value.goalName,
        goalType: goalTypes[form.value.goalType].goalTypeName,
        priority: form.value.priority,
        status: statusTypes[form.value.status],
        goalDate: form.value.goalDate,
        description: form.value.description
      });

    }


    this.modalService.dismissAll();

  }

}
