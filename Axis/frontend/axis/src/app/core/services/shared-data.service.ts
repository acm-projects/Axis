import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private pageState = new BehaviorSubject<string>('home');
  currentPage = this.pageState.asObservable();

  constructor() {}

  setCurrentPage(page: string): void {
    this.pageState.next(page);
  }
}
