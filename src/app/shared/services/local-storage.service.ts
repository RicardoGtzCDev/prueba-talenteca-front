/* global globalThis */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() { }

  getItem = (item: string) => {
    const localItem = globalThis.localStorage.getItem(item);
    if (localItem) {
      return localItem;
    }
    return '';
  };

  setItem = (item: string, value: string) => { globalThis.localStorage.setItem(item, value); };

  removeItem = (item: string) => { globalThis.localStorage.removeItem(item); };
}
