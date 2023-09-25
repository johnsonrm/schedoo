import { Injectable } from "@angular/core";
import { Time } from '@angular/common';
@Injectable({providedIn: 'root'})
export class RoutineScheduleService {

  public convertStringToTime(timeString: string): Time {
    const [hours, minutes] = timeString.split(':').map(Number);
    return { hours, minutes};
  }

  public calcEndTime(startTime: Time, durationInMinutes: number): string {

    // Extract hours and minutes from the startTime
    const hours = startTime.hours;
    const minutes = startTime.minutes;

    // Calculate end time
    const totalMinutes = hours * 60 + minutes + durationInMinutes;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;

    const endTime: string = `${endHours.toString().padStart(2,'0')}:${endMinutes.toString().padStart(2,'0')}`;

    // console.log(endTime);

    return endTime;

  }



}

