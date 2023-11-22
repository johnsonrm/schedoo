import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StatusTypes } from '../models/goal.model';


@Component({
  selector: 'status-icon',
  standalone: true,
  styleUrls: ['../dashboard/dashboard.component.css'],
  template: `
    <svg [class]="class" viewBox="0 0 16 16" (click)="onSave(type)">
      <use [attr.href]="iconHref"></use>
      <title>{{ title }}</title>
    </svg>
  `
})
export class StatusIconComponent {
  @Input() class: string;
  @Input() type: StatusTypes;
  @Input() iconHref: string;
  @Input() title: string;

  @Output() save = new EventEmitter<StatusTypes>();

  onSave(statusType: StatusTypes) {
    this.save.emit(statusType);
  }
}
