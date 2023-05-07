import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class CurrentPageService {
  private currentUrl = new BehaviorSubject<string[]>([]);
  currentUrl$ = this.currentUrl.asObservable();
  getCurrentUrl() { return this.currentUrl.getValue(); }
  setCurrentUrl(newCurrentUrl: string[]) { this.currentUrl.next(newCurrentUrl); }
}
