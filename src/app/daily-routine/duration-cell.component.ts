import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-duration-cell',
  // standalone: true,
  // imports: [CommonModule, FormsModule],
  styleUrls: ['./daily-routine.component.css'],
  template: `
    <ng-container *ngIf="!editing">
      <div (click)="onEdit()">{{ value }}</div>
    </ng-container>
    <ng-container *ngIf="editing">
      <div>
        <input type="number" [ngModel]="value" (ngModelChange)="onInputChange($event)" class="durationInput" max="1440"/>
        <button class="btn btn-link btn-sm" (click)="onSave()">Save</button>
        <button class="btn btn-link btn-sm" (click)="onCancel()">Cancel</button>
      </div>
    </ng-container>
  `
})
export class DurationCellComponent {
  @Input() value: number;
  @Input() itemId: string;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  editing = false;

  onEdit() {
    this.editing = true;
  }

  onInputChange(value: number) {
    this.value = value;
  }

  onSave() {
    this.editing = false;
    this.save.emit({itemId: this.itemId, itemDuration: this.value});
  }

  onCancel() {
    this.editing = false;
    this.cancel.emit();
  }
}
