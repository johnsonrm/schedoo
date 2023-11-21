export class GoalType {
  public goalTypeName: string;
  public dateFormat: string;
}

export const goalTypes = [{
  goalTypeName: 'Annual',
  dateFormat: 'yyyy'
}, {
  goalTypeName: 'Monthly',
  dateFormat: 'yyyy-MM'
}, {
  goalTypeName: 'Weekly',
  dateFormat: 'yyyy-MM-dd'
  }
] as const;

export enum StatusTypes {
  Incomplete = 'Incomplete',
  CompletedOntime = 'Completed ontime',
  CompletedLate = 'Completed late',
  CompletedEarly = 'Completed early',
  Canceled = 'Canceled'
}

export const statusTypes = [
  StatusTypes.Incomplete,
  StatusTypes.CompletedOntime,
  StatusTypes.CompletedLate,
  StatusTypes.CompletedEarly,
  StatusTypes.Canceled
];

export class Goal {
  public id: string = '';
  public goalName: string;
  public goalDate: Date;
  public goalType: string;
  public priority: number = 0;
  public status: string = statusTypes[0];
  public description: string;

  constructor(goalName: string, goalDate: Date, goalType: string, status: string = statusTypes[0], priority: number, description: string, id?: string) {
    this.id = id;
    this.goalName = goalName;
    this.description = description;
    this.goalDate = goalDate;
    this.priority = priority;
    this.status = status;
    this.goalType = goalType;
  }
}


