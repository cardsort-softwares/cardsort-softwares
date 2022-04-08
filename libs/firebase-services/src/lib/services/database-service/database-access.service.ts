import { Injectable } from '@angular/core';
import { getApp } from "firebase/app";
import { ref, getDatabase, Database, get, child, push, update, set } from "firebase/database";
import {catchError, from, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatabaseAccessService {
  private readonly databaseReference: Database;

  constructor() {
    const app = getApp();
    this.databaseReference = getDatabase(app);
  }

  public getStoredData<T>(dataPath: string): Observable<T> {
    return from(get(child(ref(this.databaseReference), dataPath)))
      .pipe(
        map((data) => {
          return data.val();
        }),
        catchError((error) => {
          console.log(error);
          throw error;
        })
      )
  }

  public updateData<T>(dataPath: string, updatedValue: T): Observable<T> {
    const dbRef = ref(this.databaseReference);
    const newDataKey = push(child(dbRef, dataPath)).key;
    const updates: {[key: string]: any} = {};
    updates[`${dataPath}${dataPath.endsWith('/') ? '' : '/'}${newDataKey}`] = updatedValue;

    return from(update(dbRef, updates))
      .pipe(
        map(() => {
          return updatedValue;
        }),
        catchError((error) => {
          console.log(error);
          throw error;
        })
      )
  }

  public setData<T>(dataPath: string, value: T): Observable<T> {
    const dbRef = ref(this.databaseReference, dataPath);
    return from(set(dbRef, value))
      .pipe(
        map(() => {
          return value;
        }),
        catchError((error) => {
          console.log(error);
          throw error;
        })
      )
  }
}
