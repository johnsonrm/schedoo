import { Goal } from './goal.model';
import { DailyRoutine } from './daily.routine.model';

export interface User {
    uid: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    photoURL: string;
    providerId: string;
    goals: Goal[];
    dailyRoutines: DailyRoutine[];

}

