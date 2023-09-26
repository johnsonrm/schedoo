import { Goal } from './goal.model';
import { DailyRoutine } from './daily.routine.model';
import { Affirmation } from './affirmation.model';

export interface User {
    uid: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    photoURL: string;
    providerId: string;
    goals: Goal[];
    dailyRoutines: DailyRoutine[];
    affirmations: Affirmation[];

}

