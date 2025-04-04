import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { College } from '../models/college.model';
import { Scholarship } from '../models/scholarship.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private pageState = new BehaviorSubject<string>('home');
  currentPage = this.pageState.asObservable();
  colleges = new Map<number, College>();
  scholarships = new Map<number, Scholarship>();

  setCurrentPage(page: string): void {
    this.pageState.next(page);
  }

  saveCollege(college: College): void {
    this.colleges.set(college.college_id, college);
  }

  saveScholarship(scholarship: Scholarship): void {
    this.scholarships.set(scholarship.id, scholarship);
  }

  getCollege(id: number): College | undefined {
    return this.colleges.get(id);
  }

  getScholarship(id: number): Scholarship | undefined {
    return this.scholarships.get(id);
  }
}
