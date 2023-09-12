import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalItem, goalTypes } from '../../models/goal.model';
import { GoalService } from 'src/app/services/goal.service';
import { TextCellComponent } from 'src/app/shared/text-cell.component';
import { DateCellComponent } from 'src/app/shared/date-cell.component';

@Component({
  selector: 'app-goal-dashboard',
  standalone: true,
  imports: [CommonModule, TextCellComponent, DateCellComponent],
  templateUrl: './goal-dashboard.component.html',
  styleUrls: ['./goal-dashboard.component.css',
  '../dashboard.component.css']
})
export class GoalDashboardComponent {

  private today: Date = new Date();
  year: number = this.today.getFullYear();
  month: number = this.today.getMonth();
  monthName = this.today.toLocaleString('en-US', { month: 'long' });


  goalTypes = goalTypes;

  goalItems: GoalItem[][] = [];

  constructor( private goalService: GoalService ) {

    goalService.goalItems.subscribe((items: GoalItem[]) => {

      if (!items) return;

      console.log(items);

      goalTypes.forEach( (goalType, goalTypeIndex) => {
        this.goalItems[goalTypeIndex] = items.filter((item: GoalItem) => item.goalType === goalType.goalTypeName);
      });

    });

  }


}
