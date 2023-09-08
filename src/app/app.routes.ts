import { Routes } from '@angular/router';
import { DailyRoutineComponent } from './daily-routine/daily-routine.component';
import { GoalsComponent } from './goals/goals.component';

export const routes: Routes = [ {
  path: 'routine',
  component: DailyRoutineComponent
}, {
  path: 'goals',
  component: GoalsComponent
}

];
