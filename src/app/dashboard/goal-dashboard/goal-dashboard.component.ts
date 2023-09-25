import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Goal, goalTypes } from '../../models/goal.model';
import { TextCellComponent } from 'src/app/shared/text-cell.component';
import { DateCellComponent } from 'src/app/shared/date-cell.component';
import { User } from '../../models/user.model';
import { UserStateModel } from '../../store/states/user.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-goal-dashboard',
  standalone: true,
  imports: [CommonModule, TextCellComponent, DateCellComponent],
  templateUrl: './goal-dashboard.component.html',
  styleUrls: ['./goal-dashboard.component.css',
  '../dashboard.component.css']
})
export class GoalDashboardComponent {

  @Select((state: {user: UserStateModel}) => state.user.userData) userData$ : Observable<User>;

  private today: Date = new Date();
  year: number = this.today.getFullYear();
  month: number = this.today.getMonth();
  monthName = this.today.toLocaleString('en-US', { month: 'long' });
  goalTypes = goalTypes;
  goalItems: Goal[][] = [];

  constructor( ) {

    this.userData$.subscribe((userData: User) => {

      if (!userData.goals) return;

      goalTypes.forEach( (goalType, goalTypeIndex) => {
        this.goalItems[goalTypeIndex] = userData.goals.filter((item: Goal) => item.goalType === goalType.goalTypeName);
      });

    });

  }


}
