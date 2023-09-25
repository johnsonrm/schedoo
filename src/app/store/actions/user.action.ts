import { Goal } from 'src/app/models/goal.model';
import { User } from '../../models/user.model';
import { DailyRoutine } from 'src/app/models/daily.routine.model';

export namespace UserActions {

  export class Login {
    static readonly type = '[User] Logged In User';
    constructor(public payload: string) { //payload is the uid of the user
    }
  }

  export class Logout {
    static readonly type = '[User] Logged Out User';
    constructor() {
    }
  }

  export class AddGoal {
    static readonly type = '[User] Add a goal';
    constructor(public payload: Goal) {

    }
  }

  export class UpdateGoal {
      static readonly type = '[User] Update a goal';
      constructor(public payload: Goal) {
      }
    }

  export class RemoveGoal {
    static readonly type = '[User] Remove a goal';
    constructor(public payload: Goal) {
    }

  }

  export class AddDailyRoutine {
    static readonly type = '[User] Add a daily routine';
    constructor(public payload: DailyRoutine) {

    }
  }

  export class UpdateDailyRoutine {
      static readonly type = '[User] Update a daily routine';
      constructor(public payload: DailyRoutine) {
      }
    }

  export class RemoveDailyRoutine {
    static readonly type = '[User] Remove a daily routine';
    constructor(public payload: DailyRoutine) {
    }

  }

}
