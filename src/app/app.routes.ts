import { Routes } from '@angular/router';
import { DailyRoutineComponent } from './daily-routine/daily-routine.component';
import { GoalsComponent } from './goals/goals.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
  {
  path: '',
  component: DashboardComponent
},
{
  path: 'routine',
  component: DailyRoutineComponent
}, {
  path: 'goals',
  component: GoalsComponent
}

];
