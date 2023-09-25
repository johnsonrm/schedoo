import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineDashboardComponent } from './routine-dashboard/routine-dashboard.component';
import { GoalDashboardComponent } from './goal-dashboard/goal-dashboard.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RoutineDashboardComponent, GoalDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {



}
