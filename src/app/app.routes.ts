import { Routes } from '@angular/router';
import { DailyRoutineComponent } from './daily-routine/daily-routine.component';
import { GoalsComponent } from './goals/goals.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AffirmationsComponent } from './affirmations/affirmations.component';
import { JournalComponent } from './journal/journal.component';
import { RulesComponent } from './rules/rules.component';
import { ReadingComponent } from './reading/reading.component';
import { ReferencesComponent } from './references/references.component';

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
}, {
  path: 'affirmations',
  component: AffirmationsComponent
}, {
  path: 'journal',
  component: JournalComponent
}, {
  path: 'rules',
  component: RulesComponent
}, {
  path: 'reading',
  component: ReadingComponent
}, {
  path: 'references',
  component: ReferencesComponent
}
];
