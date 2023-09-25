import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { StatusTypes, statusTypes } from '../models/goal.model';

@Component({
  selector: 'app-status-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <ng-container *ngIf="!editing">
    <div (click)="onEdit()">{{ status }}</div>
  </ng-container>
  <ng-container *ngIf="editing">
    <div>
      <select [(ngModel)]="selectedStatusIndex" (ngModelChange)="onSelectChange($event)">
        <option *ngFor="let status of statusTypes; let i = index" [ngValue]="i">
          {{ status }}
        </option>
      </select>
      <button class="btn btn-link btn-sm" (click)="onSave()">Save</button>
      <button class="btn btn-link btn-sm" (click)="onCancel()">Cancel</button>
    </div>
  </ng-container>
  `,
  styleUrls: ['../app.component.css']
})
export class StatusCellComponent implements OnInit {

  @Input() status: string;
  @Input() itemId: string;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() editing = false;

  statusTypes = statusTypes;
  selectedStatusIndex: number = 0;

  ngOnInit() {
    this.selectedStatusIndex = this.statusTypes.indexOf(this.status as StatusTypes);
  }

  onEdit() {
    this.editing = true;
  }

  onSelectChange(value: number) {

    console.log(value);
    this.status = statusTypes[value];
    // this.selectedPeriod = value;
    // this.selectedPeriodText = GoalPeriod[value];
    // this.selectedPeriodChange.emit(value);
    // this.editing = false;
  }


  onSave() {
    this.editing = false;
    this.save.emit({itemId: this.itemId, status: this.status});
  }


  onCancel() {
    this.editing = false;
  }
}


