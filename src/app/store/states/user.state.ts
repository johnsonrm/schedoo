import { User } from 'src/app/models/user.model';
import { State } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Action, StateContext } from '@ngxs/store';
import { UserActions } from '../actions/user.action';
import { Goal } from 'src/app/models/goal.model';
import { Firestore, collection, getDoc, getDocs, doc, addDoc, query, updateDoc, deleteDoc, Timestamp } from '@angular/fire/firestore';
import { CollectionReference, DocumentReference,  } from 'firebase/firestore';
import { DailyRoutine, RoutineStatus } from 'src/app/models/daily.routine.model';
import { RoutineScheduleService } from 'src/app/services/routine-schedule.service';
import { Affirmation } from 'src/app/models/affirmation.model';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
export interface UserStateModel {
  userData: User;
}

// Define relationships between collection names and item types
interface CollectionTypeMap {
  goals: Goal;
  dailyRoutines: DailyRoutine;
  affirmations: Affirmation;
  // ... add other collections and their respective item types
}

type CollectionName = keyof CollectionTypeMap;

@State<UserStateModel>({
  name: 'user',
  defaults: {
    userData: {
      goals: [],
      dailyRoutines: []} as User,

  }
})
@Injectable()
export class UserState {

  private usersCollection: CollectionReference = null;
  private userDocument: DocumentReference = null;

  constructor(private angularFirestore: Firestore, private dailyRoutineService: RoutineScheduleService) {
    this.usersCollection = collection(this.angularFirestore, 'users');
   }

  @Action(UserActions.Login)
  async Login(ctx: StateContext<UserStateModel>, action: UserActions.Login) { // action.payload is the uid of the user that logged in

    // get the user data from the firestore
    const firebaseDoc = await getDoc(doc(this.usersCollection, action.payload))
    const userDocData = firebaseDoc.data();

    if (userDocData) {

      this.userDocument = firebaseDoc.ref;

      // set the initial user data in the state
      ctx.setState({userData: <User>userDocData});

      // add goals
      this.getUserItems(ctx, 'goals');

      // add routines
      this.getUserItems(ctx, 'dailyRoutines', this.sortDailyRoutineItems, this.transformationDailyRoutineItems);


    }

  }

  @Action(UserActions.Logout)
  Logout(ctx: StateContext<UserStateModel>, action: UserActions.Logout) {
      console.log();
      ctx.setState({userData: {goals: [], dailyRoutines: []} as User});

  }

  @Action(UserActions.AddGoal)
  async AddGoal(ctx: StateContext<UserStateModel>, action: UserActions.AddGoal) {

    try {
      this.addItem(ctx, 'goals', action.payload);

    } catch(err) {
      console.error("Error adding daily routine: ", err);
      throw err;

    }

  }

  @Action(UserActions.UpdateGoal)
  async UpdateGoal(ctx: StateContext<UserStateModel>, action: UserActions.UpdateGoal) {

    try {
      console.log(action.payload);
      this.updateItem(ctx, 'goals', action.payload);
    } catch(err) {
      console.error("Error updating a goal: ", err);
      throw err("Error updating a goal", err);
    }

  }

  @Action(UserActions.RemoveGoal)
  async RemoveGoal(ctx: StateContext<UserStateModel>, action: UserActions.RemoveGoal) {

    try {
      this.removeItem(ctx, 'goals', action.payload);
    } catch(err) {
      console.error("Error deleting a goal.", err);
      throw err;
    }

  }

  // Daily Routine Actions

  @Action(UserActions.AddDailyRoutine)
  async AddDailyRoutine(ctx: StateContext<UserStateModel>, action: UserActions.AddDailyRoutine) {

    try {
      this.addItem(ctx, 'dailyRoutines', action.payload, this.sortDailyRoutineItems);

    } catch(err) {
      console.error("Error adding daily routine: ", err);
      throw err;

    }

  }

  @Action(UserActions.UpdateDailyRoutine)
  async UpdateDailyRoutine(ctx: StateContext<UserStateModel>, action: UserActions.UpdateDailyRoutine) {

    try {
      this.updateItem(ctx, 'dailyRoutines', action.payload);
    } catch(err) {
      console.error("Error updating document: ", err);
      throw err("Error updating daily routine entry", err);
    }

  }

  @Action(UserActions.AddOrUpdateDailyRoutineStatus)
  async AddOrUpdateDailyRoutineStatus(ctx: StateContext<UserStateModel>, action: UserActions.AddOrUpdateDailyRoutineStatus) {

    // create a new status object (handles date formatting)
    const newStatus: RoutineStatus = new RoutineStatus(action.status, new Date());

    if (!action.dailyRoutine.dailyStatus) {
      action.dailyRoutine.dailyStatus = [];
      action.dailyRoutine.dailyStatus.push(newStatus);
    } else {
      const index = action.dailyRoutine.dailyStatus.findIndex( (status: RoutineStatus) => {
        return Date.parse(status.date.toISOString()) === Date.parse(newStatus.date.toISOString());
      });

      if (index === -1) {
        action.dailyRoutine.dailyStatus.push(newStatus);
      } else {
        action.dailyRoutine.dailyStatus[index] = newStatus;
      }

    }

    try {
      this.updateItem(ctx, 'dailyRoutines', action.dailyRoutine);
    } catch(err) {
      console.error("Error updating document: ", err);
      throw err("Error updating daily routine entry", err);
    }

  }



  @Action(UserActions.RemoveDailyRoutine)
  async RemoveDailyRoutine(ctx: StateContext<UserStateModel>, action: UserActions.RemoveDailyRoutine) {

    try {
      this.removeItem(ctx, 'dailyRoutines', action.payload);
    } catch(err) {
      console.error("Error deleting daily routine entry", err);
      throw err;
    }

  }

  // Affirmation Actions

  @Action(UserActions.AddAffirmation)
  async AddAffirmation(ctx: StateContext<UserStateModel>, action: UserActions.AddAffirmation) {

    try {
      this.addItem(ctx, 'affirmations', action.payload);

    } catch(err) {
      console.error("Error adding affirmation: ", err);
      throw err;

    }

  }

  @Action(UserActions.UpdateAffirmation)
  async UpdateAffirmation(ctx: StateContext<UserStateModel>, action: UserActions.UpdateAffirmation) {

    try {
      this.updateItem(ctx, 'affirmations', action.payload);
    } catch(err) {
      console.error("Error updating document: ", err);
      throw err("Error updating daily routine entry", err);
    }

  }


  @Action(UserActions.RemoveAffirmation)
  async RemoveAffirmation(ctx: StateContext<UserStateModel>, action: UserActions.RemoveAffirmation) {

    try {
      this.removeItem(ctx, 'affirmations', action.payload);
    } catch(err) {
      console.error("Error deleting affirmation", err);
      throw err;
    }

  }

  private getKeys<T>(arr: T[]): string[] {
    if (arr.length === 0) {
      return [];
    }
    return Object.keys(arr[0]);
  }

private async getUserItems<T extends CollectionName>(
  ctx: StateContext<UserStateModel>,
  collectionName: T,
  sortFunction?: (items: CollectionTypeMap[T][]) => void,
  transformationFunction?: (items: CollectionTypeMap[T][]) => CollectionTypeMap[T][]
) {
  try {
      const itemsCollection = collection(this.userDocument, collectionName);
      const itemsQuery = query(itemsCollection);
      const querySnapshot = await getDocs(itemsQuery);

      let items: CollectionTypeMap[T][] = querySnapshot.docs.map(doc => {
          const item = doc.data() as CollectionTypeMap[T];
          const updateItem: CollectionTypeMap[T] = {
              id: doc.id,
              ...item
          } as unknown as CollectionTypeMap[T]; // Force cast since Firestore's data may not align perfectly

          // Convert Firestore Timestamp fields to Dates and return the item
          return this.convertTimestampsToDates(updateItem);
      });

      if (sortFunction) {
          sortFunction(items);
      }

      if (transformationFunction) {
        items = transformationFunction(items);
      }

      ctx.patchState({
          userData: {
              ...ctx.getState().userData,
              [collectionName]: items
          }
      });
  } catch (error) {
      console.error(`Failed to get user items for collection: ${collectionName}`, error);
      // Handle or throw error as needed
  }
}

private async addItem<T extends CollectionName>(
  ctx: StateContext<UserStateModel>,
  collectionName: T,
  item: CollectionTypeMap[T],
  sortFunction?: (items: CollectionTypeMap[T][]) => void
) {
  try {

    const currentState = ctx.getState().userData;
    const currentItems = [...(currentState[collectionName] as CollectionTypeMap[T][])];

    if (this.userDocument) {

      // Convert dates to Timestamps for Firestore before adding
      const firestoreItem = this.convertDatesToTimestamps({ ...item });
      delete firestoreItem.id;

      const itemsCollection = collection(this.userDocument, collectionName);
      const newItemDoc = await addDoc(itemsCollection, this.convertCustomObjectToPlainObject(firestoreItem));

      const updatedItem = {
        ...item,
        id: newItemDoc.id
      };

      currentItems.push(this.convertTimestampsToDates(updatedItem));

      if (sortFunction) {
        sortFunction(currentItems);
      }

      // Update the state
      ctx.patchState({
        userData: {
          ...currentState,
          [collectionName]: currentItems
        }
      });
    } else {
      throw new Error(`Error when attempting to add an item of type ${collectionName} to the user data.`);
    }
  } catch (error) {
    console.error(`Failed to add item to ${collectionName}:`, error);
    // Handle or throw error as needed
  }
}

  private async updateItem<T extends CollectionName>(
    ctx: StateContext<UserStateModel>,
    collectionName: T,
    item: CollectionTypeMap[T]
  ): Promise<void> {
    const currentState = ctx.getState().userData;
    const currentItems = [...(currentState[collectionName] as CollectionTypeMap[T][])];

    if (!this.userDocument || !currentItems) {
      throw new Error("Invalid user document or collection.");
    }

    // Convert dates to Timestamps for Firestore before updating
    const firestoreItem = this.convertDatesToTimestamps({ ...item });
    delete firestoreItem.id; // Ensure ID is not part of the updated fields

    if (!item.id) {
      throw new Error("Item must have an id to be updated.");
    }

    const itemsCollection = collection(this.userDocument, collectionName);
    const itemDocRef = doc(itemsCollection, item.id);
    const docSnapshot = await getDoc(itemDocRef);

    if (docSnapshot.exists()) {
      await updateDoc(itemDocRef, this.convertCustomObjectToPlainObject(firestoreItem));

      // Document was updated successfully in Firestore, now update the state
      const itemIndex = currentItems.findIndex(updateItem => updateItem.id === item.id);

      if (itemIndex > -1) {
        currentItems[itemIndex] = item; // Update the item in the local state
        ctx.patchState({
          userData: {
            ...currentState,
            [collectionName]: currentItems
          }
        });
      }
    } else {
      throw new Error("Attempted to update an item that was not found in the data.");
    }
  }

  private async removeItem<T extends CollectionName>(
    ctx: StateContext<UserStateModel>,
    collectionName: T,
    item: CollectionTypeMap[T]
  ): Promise<void> {
    const newUserData: User = { ...ctx.getState().userData };
    const currentItems = newUserData[collectionName];

    if (!item.id) {
      throw new Error("Item must have an id to be removed.");
    }

    try {
      if (this.userDocument) {
        const itemsCollection = collection(this.userDocument, collectionName);
        const docRef = doc(itemsCollection, item.id);

        await deleteDoc(docRef);

        // User document was updated successfully in Firestore, i.e. item was removed; now update the state
        const itemIndex = currentItems.findIndex(updateItem => updateItem.id === item.id);

        if (itemIndex > -1) {
          // Remove the item and update the state
          currentItems.splice(itemIndex, 1);
          ctx.patchState({ userData: newUserData });
        } else {
          throw new Error("Item not found in the state.");
        }
      } else {
        throw new Error("Attempted to remove an item from a user that was not logged in or had no associated data.");
      }
    } catch (err) {
      console.error("Error deleting document: ", err);
      throw err;
    }
  }

  // Utility functions for date conversion
  private convertDatesToTimestamps(obj: any): any {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = value instanceof Date ? Timestamp.fromDate(value) : value;
      return acc;
    }, {});
  }

  private convertTimestampsToDates(obj: any): any {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value instanceof Timestamp){
        acc[key] = value.toDate();
      } else if (value && typeof value === 'object' && 'seconds' in value) {
        acc[key] = new Date( Number(value['seconds']) * 1000);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
  }

  private sortDailyRoutineItems(dailyRoutineItems: DailyRoutine[]) {

    if(dailyRoutineItems) {
      dailyRoutineItems.sort( (a, b) => {
        return a.time.hours - b.time.hours || a.time.minutes - b.time.minutes;
      });
    }

  }

  private transformationDailyRoutineItems(dailyRoutineItems: DailyRoutine[]): DailyRoutine[] {

    const newDailyRoutineItems = (dailyRoutineItems || []).map((dailyRoutineItem: any) => DailyRoutine.fromObject(dailyRoutineItem));

    return (newDailyRoutineItems);

  }


  private convertCustomObjectToPlainObject(input: any): any {

    if (Array.isArray(input)) {
      // If it's an array, recursively convert each element
      return input.map((item) => this.convertCustomObjectToPlainObject(item));
    } else if (typeof input === 'object' && input !== null) {

      if (input.toObject) {
        return input.toObject();
      } else {
        // recursively convert its properties
        const result: any = {};
        for (const key in input) {
          if (input.hasOwnProperty(key)) {
            result[key] = this.convertCustomObjectToPlainObject(input[key]);
          }
        }
        return result;

      }

    } else if (input instanceof Date) {
      // If it's a date object, convert it to a ISO string representation
      return input.toISOString();
    } else {
      // For other types (primitives), return as is
      return input;
    }
  }



}



