import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GoalPeriod } from '../models/goal.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-goal-period-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <ng-container *ngIf="!editing">
    <div (click)="onEdit()">{{ selectedPeriodText }}</div>
  </ng-container>
  <ng-container *ngIf="editing">
    <div>
      <select [(ngModel)]="selectedPeriod" (ngModelChange)="onSelectChange($event)">
        <option *ngFor="let period of goalPeriods; let i = index" [ngValue]="i">
          {{ period }}
        </option>
      </select>
      <button class="btn btn-link btn-sm" (click)="onSave()">Save</button>
      <button class="btn btn-link btn-sm" (click)="onCancel()">Cancel</button>
    </div>
  </ng-container>
  `,
  styleUrls: ['../app.component.css']
})
export class GoalPeriodSelectorComponent implements OnInit {
  @Input() selectedPeriod: GoalPeriod;
  @Input() itemId: string;
  @Output() save = new EventEmitter<any>();

  goalPeriods = Object.keys(GoalPeriod).filter( k => typeof GoalPeriod[k as any] === "number");

  editing = false;
  private selectedPeriodText: string;

  ngOnInit() {
    this.selectedPeriodText = GoalPeriod[this.selectedPeriod];
  }


  onEdit() {
    this.editing = true;
  }

  onSelectChange(value: GoalPeriod) {
    this.selectedPeriod = value;
    this.selectedPeriodText = GoalPeriod[value];
    // this.selectedPeriodChange.emit(value);
    // this.editing = false;
  }


  onSave() {
    this.editing = false;
    this.save.emit({itemId: this.itemId, period: this.selectedPeriod});
  }


  onCancel() {
    this.editing = false;
  }
}


