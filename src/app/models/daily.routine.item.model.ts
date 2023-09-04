export class DailyRoutineItem
{
  public time: Date;
  public duration: number;
  public description: string;

  constructor(time: Date, duration: number, description: string)
  {
    this.time = time;
    this.duration = duration;
    this.description = description;
  }
}
