import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineDashboardComponent } from './routine-dashboard/routine-dashboard.component';
import { GoalDashboardComponent } from './goal-dashboard/goal-dashboard.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  // standalone: true,
  // imports: [CommonModule, RoutineDashboardComponent, GoalDashboardComponent, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // constructor(private http: HttpClient) {


  //   //https://getrecaptchalivekey-nwbh4vxb3a-uc.a.run.app

  //   http.get('https://getrecaptchalivekey-nwbh4vxb3a-uc.a.run.app').subscribe((data) => {
  //     console.log(data);
  //   });


  //  }


}
