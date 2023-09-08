import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-cell',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['../app.component.css'],
  template: `
    <ng-container *ngIf="!editing">
      <div (click)="onEdit()" class='inline'>{{ value }}</div>
    </ng-container>
    <ng-container *ngIf="editing">
      <div class='inline'>
        <input type="description" [ngModel]="value" (ngModelChange)="onInputChange($event)" maxlength="100" />
        <button class="btn btn-link btn-sm" (click)="onSave()">Save</button>
        <button class="btn btn-link btn-sm" (click)="onCancel()">Cancel</button>
      </div>
    </ng-container>
  `
})
export class TextCellComponent {
  @Input() fieldName: string;
  @Input() value: string;
  @Input() itemId: string;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  @Output() editing = false;

  onEdit() {
    this.editing = true;
  }

  onInputChange(value: string) {
    this.value = value;
  }

  onSave() {
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
