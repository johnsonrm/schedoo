import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DailyRoutineComponent } from './daily-routine/daily-routine.component';
import { GoalsComponent } from './goals/goals.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutineDashboardComponent } from './dashboard/routine-dashboard/routine-dashboard.component';
import { GoalDashboardComponent } from './dashboard/goal-dashboard/goal-dashboard.component';
import { TextCellComponent } from 'src/app/shared/text-cell.component';
import { DateCellComponent } from 'src/app/shared/date-cell.component';
import { DailyRoutineItemModalComponent } from './daily-routine/daily-routine-item-modal/daily-routine-item-modal.component';
import { NewGoalModalComponent } from './goals/new-goal-modal/goal-item-modal.component';
import { DurationCellComponent } from './daily-routine/duration-cell.component';
import { TimeCellComponent } from './daily-routine/time-cell.component';
import { DescriptionCellComponent } from './daily-routine/description-cell.component';
import { StatusCellComponent } from './shared/status-cell.component';
import { NumberCellComponent } from './shared/number-cell.component';

const routes: Routes = [ {
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DailyRoutineComponent,
    GoalsComponent,
    DashboardComponent,
    RoutineDashboardComponent,
    GoalDashboardComponent,
    TextCellComponent,
    DateCellComponent,
    DailyRoutineItemModalComponent,
    NewGoalModalComponent,
    DurationCellComponent,
    TimeCellComponent,
    DescriptionCellComponent,
    StatusCellComponent,
    NumberCellComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
