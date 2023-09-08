import { Injectable } from "@angular/core";
import { CommonModule, Time } from '@angular/common';
import { FirebaseService } from "./firebase.service";
import { collection, doc, getDocs, addDoc, query, orderBy, limit, where, updateDoc, deleteDoc  } from 'firebase/firestore/lite';
import { BehaviorSubject } from "rxjs";
import { GoalItem, GoalPeriod } from "../models/goal.model";

@Injectable({providedIn: 'root'})
export class GoalService {

  private goalItemsSubject = new BehaviorSubject<GoalItem[]>(null);
  public goalItems = this.goalItemsSubject.asObservable();

  constructor(private firebaseService: FirebaseService) {

    // get goal items from firebase
    this.getGoalItems();

   }

   async getGoalItems() {

    const db = this.firebaseService.db;
    const goalItemsCollection = collection(db, "goals");
    const items: GoalItem[] = [];
    const q = query(goalItemsCollection);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      const goalItem = doc.data();
      items.push({id: doc.id, goalName: goalItem.goalName, period: goalItem.period, description: goalItem.description});
    });

    this.goalItemsSubject.next(items);

  }

   async addItem(item: GoalItem) {

    try {
      const db = this.firebaseService.db;
      const docRef = await addDoc(collection(db, "goals"), {
        goalName: item.goalName,
        period: item.period,
        description: item.description
      });

      const updatedItems = [...this.goalItemsSubject.value, {
        id: docRef.id,
        goalName: item.goalName,
        period: item.period,
        description: item.description
      }];

      console.log(updatedItems);
      this.goalItemsSubject.next(updatedItems);

    } catch (err) {
      console.error("Error adding document: ", err);
      throw err;
    }

   }

   async updateItem(itemId: string, updatedItem: GoalItem) {

    try {
      const db = this.firebaseService.db;
      const docRef = doc(db, "goals", itemId);

      await updateDoc(docRef, {
        goalName: updatedItem.goalName,
        period: updatedItem.period,
        description: updatedItem.description
      });

      const updatedItems = this.goalItemsSubject.value.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            goalName: updatedItem.goalName,
            duration: updatedItem.period,
            description: updatedItem.description
          };
        } else {
          return item;
        }
      });

      this.goalItemsSubject.next(updatedItems);

    } catch (err) {
      console.error("Error updating document: ", err);
      throw err;
    }
  }

  deleteItem(itemId: string) {

    try {

      const docRef = doc(this.firebaseService.db, "goals", itemId);

      deleteDoc(docRef).then(() => {
        const updatedItems = this.goalItemsSubject.value.filter(item => item.id !== itemId);
        this.goalItemsSubject.next(updatedItems);
      });

    } catch (err) {
      console.error("Error deleting document: ", err);
      throw err;
    }
  }


}

