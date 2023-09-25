import { Time } from '@angular/common';
import { statusTypes } from './goal.model';
export class DailyRoutine
{
  public id: string;
  public time: Time;
  public duration: number;
  public description: string;

  constructor(time: Time, duration: number, status: string, description: string, id?: string)
  {
    this.id = id;
    this.time = time;
    this.duration = duration;
    this.description = description;

  }
}