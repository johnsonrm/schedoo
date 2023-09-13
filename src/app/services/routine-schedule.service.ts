import { Injectable } from "@angular/core";
import { CommonModule, Time } from '@angular/common';
import { DailyRoutineItem } from "../models/daily.routine.item.model";
import { FirebaseService } from "./firebase.service";
import { collection, doc, getDocs, addDoc, query, orderBy, limit, where, updateDoc, deleteDoc  } from 'firebase/firestore/lite';
import { BehaviorSubject } from "rxjs";
@Injectable({providedIn: 'root'})
export class RoutineScheduleService {

  private dailyRoutineItemsSubject = new BehaviorSubject<DailyRoutineItem[]>(null);
  public dailyRoutineItems = this.dailyRoutineItemsSubject.asObservable();

  constructor(private firebaseService: FirebaseService) {

    // get daily routine items from firebase
    this.getDailyRoutineItems();

   }

   convertStringToTime(timeString: string): Time {
    const [hours, minutes] = timeString.split(':').map(Number);
    return { hours, minutes};
  }

   async getDailyRoutineItems() {

    const db = this.firebaseService.db;
    const dailyRoutineItemsCollection = collection(db, "daily-routine-items");
    const items: DailyRoutineItem[] = [];
    const q = query(dailyRoutineItemsCollection, orderBy("time"), limit(100));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      const dailyRoutineItem = doc.data();
      dailyRoutineItem.time = this.convertStringToTime(dailyRoutineItem.time);
      items.push({id: doc.id, time: dailyRoutineItem.time, status: dailyRoutineItem.status, duration: dailyRoutineItem.duration, description: dailyRoutineItem.description});
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

      const updatedItems = [...this.dailyRoutineItemsSubject.value];

      this.dailyRoutineItemsSubject.next(updatedItems);

    } catch (err) {
      console.error("Error adding document: ", err);
      throw err;
    }

   }

   async updateItem(itemId: string, updatedItem: DailyRoutineItem) {

    try {
      const db = this.firebaseService.db;
      const docRef = doc(db, "daily-routine-items", itemId);

      await updateDoc(docRef, {
        time: updatedItem.time,
        duration: updatedItem.duration,
        description: updatedItem.description
      });

      const updatedItems = this.dailyRoutineItemsSubject.value.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            time: updatedItem.time,
            duration: updatedItem.duration,
            description: updatedItem.description
          };
        } else {
          return item;
        }
      });

      console.log(updatedItems);
      this.dailyRoutineItemsSubject.next(updatedItems);

    } catch (err) {
      console.error("Error updating document: ", err);
      throw err;
    }
  }

  deleteItem(itemId: string) {

    try {

      const docRef = doc(this.firebaseService.db, "daily-routine-items", itemId);

      deleteDoc(docRef).then(() => {
        const updatedItems = this.dailyRoutineItemsSubject.value.filter(item => item.id !== itemId);
        this.dailyRoutineItemsSubject.next(updatedItems);
      });

    } catch (err) {
      console.error("Error deleting document: ", err);
      throw err;
    }
  }

  calcEndTime(startTime: Time, durationInMinutes: number): string {

    // Extract hours and minutes from the startTime
    const hours = startTime.hours;
    const minutes = startTime.minutes;

    // Calculate end time
    const totalMinutes = hours * 60 + minutes + durationInMinutes;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;

    const endTime: string = `${endHours.toString().padStart(2,'0')}:${endMinutes.toString().padStart(2,'0')}`;

    // console.log(endTime);

    return endTime;

  }


}

