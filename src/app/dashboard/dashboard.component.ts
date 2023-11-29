import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineDashboardComponent } from './routine-dashboard/routine-dashboard.component';
import { GoalDashboardComponent } from './goal-dashboard/goal-dashboard.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RoutineDashboardComponent, GoalDashboardComponent],
  // templateUrl: './dashboard.component.html',
  template: `
  <div class="row mt-5">
    <div class="col-md-7">
      <app-routine-dashboard></app-routine-dashboard>
    </div>
    <div class="col-md-5">
      <app-goal-dashboard></app-goal-dashboard>
    </div>
  </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {



}
