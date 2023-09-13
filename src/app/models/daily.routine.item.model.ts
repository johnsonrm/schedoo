import { Time } from '@angular/common';
import { statusTypes } from '../models/goal.model';
export class DailyRoutineItem
{
  public id: string;
  public time: Time;
  public duration: number;
  public description: string;
  public status: string = statusTypes[0];

  constructor(time: Time, duration: number, status: string, description: string, id?: string)
  {
    this.id = id;
    this.time = time;
    this.duration = duration;
    this.status = status;
    this.description = description;

  }
}
