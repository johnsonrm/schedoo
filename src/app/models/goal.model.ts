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
export class GoalItem {
  public id: string = '';
  public goalName: string;
  public goalDate: Date;
  public goalType: string;
  public description: string;

  constructor(goalName: string, goalDate: Date, goalType: string, description: string, id?: string) {
    this.id = id;
    this.goalName = goalName;
    this.description = description;
    this.goalDate = goalDate;
    this.goalType = goalType;
  }
}


