import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { College } from '../models/college.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private pageState = new BehaviorSubject<string>('home');
  currentPage = this.pageState.asObservable();
  colleges = new Map<number, College>();

  setCurrentPage(page: string): void {
    this.pageState.next(page);
  }

  saveCollege(college: College): void {
    this.colleges.set(college.college_id, college);
  }

  getCollege(id: number): College | undefined {
    if (this.colleges.has(id)) {
      return this.colleges.get(id);
    }
    return this.colleges.get(id);
  }
}
