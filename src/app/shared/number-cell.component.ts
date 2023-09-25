import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-number-cell',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['../app.component.css'],
  template: `
    <ng-container *ngIf="!editing">
      <div (click)="onEdit()" class='inline'>{{ value }}</div>
    </ng-container>
    <ng-container *ngIf="editing">
      <div class='inline'>
        <!-- <input type="number" [ngModel]="value" (ngModelChange)="onInputChange($event)" max="100" /> -->
        <input type="number" [(ngModel)]="value" max="100" />
        <button class="btn btn-link btn-sm" (click)="onSave()">Save</button>
        <button class="btn btn-link btn-sm" (click)="onCancel()">Cancel</button>
      </div>
    </ng-container>
  `
})
export class NumberCellComponent {

  @Input() fieldName: string;
  @Input() value: number;
  @Input() itemId: string;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() editing = false;

  onEdit() {
    this.editing = true;
  }

  // onInputChange(value: number) {
  //   console.log("changing value to :", value);
  //   this.value = value;
  // }

  onSave() {

    console.log('saving');
    this.editing = false;
    const jsonObject = {itemId: this.itemId};
    jsonObject[this.fieldName] = this.value;
    this.save.emit(jsonObject);
  }

  onCancel() {
    this.editing = false;
    this.cancel.emit();
  }
}
