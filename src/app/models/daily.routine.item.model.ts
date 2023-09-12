import { Time } from '@angular/common';
export class DailyRoutineItem
{
  public id: string;
  public time: Time;
  public duration: number;
  public description: string;

  constructor(time: Time, duration: number, description: string, id?: string)
  {
    this.id = id;
    this.time = time;
    this.duration = duration;
    this.description = description;

  }
}
