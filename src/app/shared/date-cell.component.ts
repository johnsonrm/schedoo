import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-cell',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['../app.component.css'],
  template: `
    <ng-container *ngIf="!editing">
      <div (click)="onEdit()" class='inline'>{{ text }}</div>
    </ng-container>
    <ng-container *ngIf="editing">
      <div class='inline'>
        <input type="date" [(ngModel)]="defaultDate" (ngModelChange)="onInputChange($event)" />
        <button class="btn btn-link btn-sm" (click)="onSave()">Save</button>
        <button class="btn btn-link btn-sm" (click)="onCancel()">Cancel</button>
      </div>
    </ng-container>
  `
})
export class DateCellComponent implements OnInit {
  @Input() fieldName: string;
  @Input() value: Date;
  @Input() text: string;
  @Input() itemId: string;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() editing = false;

  private defaultDate: string = new Date().toLocaleDateString('en-CA');

  ngOnInit() {
    if (!this.value) return;
    this.defaultDate = this.value.toLocaleDateString('en-CA');
  }

  onEdit() {
    this.editing = true;
  }

  onInputChange(value: string) {
    const localDate = new Date(value + 'T00:00:00');  // treat the date as local time, not UTC
    this.value = localDate;
    this.defaultDate = localDate.toLocaleDateString('en-CA');
}


  onSave() {
    this.editing = false;
    const jsonObject = {itemId: this.itemId};
    jsonObject[this.fieldName] = this.value;
    console.log(jsonObject);
    this.save.emit(jsonObject);
  }

  onCancel() {
    this.editing = false;
    this.cancel.emit();
  }
}
