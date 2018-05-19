import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreHelperService {

  constructor() { }

  public Prep<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
