
export enum GoalPeriod {
  Daily,
  Weekly,
  Monthly,
  Yearly,
  Lifetime
}

export class GoalItem {
  public id: string;
  public goalName: string;
  public period: GoalPeriod;
  public description: string;

  constructor(goalName: string, goalPeriod: GoalPeriod, description: string, id?: string) {
    this.id = id;
    this.goalName = goalName;
    this.period = goalPeriod;
    this.description = description;
  }
}
