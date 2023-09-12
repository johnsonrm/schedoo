import { Routes } from '@angular/router';
import { DailyRoutineComponent } from './daily-routine/daily-routine.component';
import { GoalsComponent } from './goals/goals.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [ {
  path: '',
  component: DashboardComponent
}, {
  path: 'routine',
  component: DailyRoutineComponent
}, {
  path: 'goals',
  component: GoalsComponent
}

];
