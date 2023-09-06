import { Injectable } from "@angular/core";
import { collection, addDoc, getDocs } from "firebase/firestore/lite";
import { DailyRoutineItem } from "../models/daily.routine.item.model";
import { FirebaseService } from "./firebase.service";
import { BehaviorSubject } from "rxjs";
@Injectable({providedIn: 'root'})
export class RoutineScheduleService {

  private dailyRoutineItemsSubject = new BehaviorSubject<DailyRoutineItem[]>(null);
  public dailyRoutineItems = this.dailyRoutineItemsSubject.asObservable();

  constructor(private firebaseService: FirebaseService) {

    // get daily routine items from firebase
    this.getDailyRoutineItems();

   }

   async getDailyRoutineItems() {

    console.log("getDailyRoutineItems()");

    const db = this.firebaseService.db;
    const dailyRoutineItemsCollection = collection(db, "daily-routine-items");

    const items: DailyRoutineItem[] = [];
    const querySnapshot = await getDocs(dailyRoutineItemsCollection)

    querySnapshot.forEach(doc => {
      const dailyRoutineItem = doc.data();
      items.push({id: dailyRoutineItem.id, time: dailyRoutineItem.time, duration: dailyRoutineItem.duration, description: dailyRoutineItem.description});
    });

    this.dailyRoutineItemsSubject.next(items);

  }

   async addItem(item: DailyRoutineItem) {

    try {
      const db = this.firebaseService.db;
      const docRef = await addDoc(collection(db, "daily-routine-items"), {
        time: item.time,
        duration: item.duration,
        description: item.description
      });

      // const updatedItems = [...this.dailyRoutineItemsSubject.value, {
      //   id: docRef.id,
      //   time: item.time,
      //   duration: item.duration,
      //   description: item.description,
      // }];

      const updatedItems = [...this.dailyRoutineItemsSubject.value];

      console.log(updatedItems);
      this.dailyRoutineItemsSubject.next(updatedItems);

    } catch (err) {
      console.error("Error adding document: ", err);
      throw err;
    }

   }

}

