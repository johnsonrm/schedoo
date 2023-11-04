import { Time } from '@angular/common';

export type RoutineStatusOptions = 'ontime' | 'late' | 'notcompleted';
export class RoutineStatus {
  public status: RoutineStatusOptions;
  private _date: Date;

  constructor(status: RoutineStatusOptions, date: Date) {
    this.status = status;
    this._date = this.formatDate(date);

  }

  public formatDate(dateToFormat: Date): Date {
    const month = (dateToFormat.getMonth() + 1).toString().padStart(2, '0');
    const day = dateToFormat.getDate().toString().padStart(2, '0');
    const year = dateToFormat.getFullYear();
    return new Date(`${month}/${day}/${year}`);
  }

  get date(): Date {
    return this._date;
  }

  set date(newDate: Date) {

    if (newDate instanceof Date) {
      this._date = new Date(this.formatDate(newDate));
    } else {
      throw new Error('Invalid date');
    }
  }

  // Convert RoutineStatus to a plain JavaScript object
  toObject(): any {
    return {
      status: this.status,
      date: this._date.toISOString(), // Store date as ISO string
    };
  }

  // Create a RoutineStatus from a plain JavaScript object
  static fromObject(obj: any): RoutineStatus {
    return new RoutineStatus(obj.status, new Date(obj.date));
  }




}

export class DailyRoutine
{
  public id: string;
  public time: Time;
  public duration: number;
  public description: string;
  public dailyStatus: RoutineStatus[];

  constructor(time: Time, duration: number, description: string, dailyStatus: RoutineStatus[], id?: string)
  {
    this.id = id;
    this.time = time;
    this.duration = duration;
    this.description = description;
    this.dailyStatus = dailyStatus;

  }

  // Retrieve the RoutineStatus for today
  public getRoutineStatusForToday(): RoutineStatus | undefined {
    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0]; // Get today's date as a string in yyyy-mm-dd format

    return this.dailyStatus.find((status) => {
      const statusDateString = status.date.toISOString().split('T')[0];
      return statusDateString === todayDateString;
    });
  }

    // Convert DailyRoutine to a plain JavaScript object
    toObject(): any {
      return {
        id: this.id,
        time: this.time,
        duration: this.duration,
        description: this.description,
        dailyStatus: this.dailyStatus,
      };
    }

    // Static function to create a DailyRoutine from a plain JavaScript object
    static fromObject(obj: any): DailyRoutine {
      const dailyStatus: RoutineStatus[] = (obj.dailyStatus || []).map((statusData: any) => RoutineStatus.fromObject(statusData));
      return new DailyRoutine(obj.time, obj.duration, obj.description, dailyStatus, obj.id);
    }


}
