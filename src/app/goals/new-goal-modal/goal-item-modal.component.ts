import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { Goal, GoalType, goalTypes, statusTypes } from '../../models/goal.model'; //model for goals
import { UserActions } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-new-goal-modal',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './goal-item-modal.component.html',
  styleUrls: ['../../app.component.css']
})
export class NewGoalModalComponent implements OnInit {

  @Input() goalItem: Goal;

  goalName: string;
  goalType: string;
  priority: number;
  status: string;
  description: string;

  private defaultDate: string = new Date().toLocaleDateString('en-CA');
  private selectedGoalTypeIndex: number = 0;
  private selectedStatusIndex: number = 0;
  private selectedGoalType: string = GoalType[this.selectedGoalTypeIndex];

  public goalTypes = goalTypes;
  public statusTypes = statusTypes;

	closeResult = '';

	constructor(private modalService: NgbModal, public store: Store) {

  }

  ngOnInit(): void {

    if (!this.goalItem) {
      this.setDefaults();
    } else {
      this.goalName = this.goalItem.goalName;
      this.goalType = this.goalItem.goalType;
      this.defaultDate = this.goalItem.goalDate.toLocaleDateString('en-CA');
      this.priority = this.goalItem.priority;
      this.status = this.goalItem.status;
      this.description = this.goalItem.description;
    }

  }

  private setDefaults() {

      this.goalName = '';
      this.goalType = null;
      this.defaultDate = new Date().toLocaleDateString('en-CA');
      this.priority = 0;
      this.status = statusTypes[0];
      this.description = "";

    }

	open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  onSelectChange(value: any) {

    this.selectedGoalTypeIndex = value;
    this.selectedGoalType = GoalType[value];

    }

  save(form: NgForm) {

    const localDate = new Date(form.value.goalDate + 'T00:00:00');  // treat the date as local time, not UTC

    const goalItem: Goal = {
      id: null,
      goalName: form.value.goalName,
      goalDate: localDate,
      goalType: goalTypes[form.value.goalType].goalTypeName,
      priority: form.value.priority,
      status: form.value.status,
      description: form.value.description
    };

    if (this.goalItem?.id) {

      goalItem.id = this.goalItem.id;
      this.store.dispatch(new UserActions.UpdateGoal(goalItem));

    } else {

      this.store.dispatch(new UserActions.AddGoal(goalItem));

    }

    this.setDefaults();

    this.modalService.dismissAll();

  }

}
