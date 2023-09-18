// TimeCellComponent
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-cell',
  // standalone: true,
  // imports: [CommonModule, FormsModule],
  styleUrls: ['./daily-routine.component.css', '../app.component.css'],
  template: `
    <ng-container *ngIf="!editing">
      <div (click)="onEdit()">{{ value }}</div>
    </ng-container>
    <ng-container *ngIf="editing">
      <div>
        <input type="time" [ngModel]="value" (ngModelChange)="onInputChange($event)" />
        <button class="btn btn-link btn-sm" (click)="onSave()">Save</button>
        <button class="btn btn-link btn-sm" (click)="onCancel()">Cancel</button>
      </div>
    </ng-container>
  `
})
export class TimeCellComponent {
  @Input() value: string;
  @Input() itemId: string;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  editing = false;

  onEdit() {
    this.editing = true;
  }

  onInputChange(value: string) {
    this.value = value;
  }

  onSave() {
    this.editing = false;
    this.save.emit({itemId: this.itemId, itemTime: this.value});
  }

  onCancel() {
    this.editing = false;
    this.cancel.emit();
  }
}
