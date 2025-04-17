import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private cachedColleges$: Observable<{ collegeId: string; name: string }[]> | null = null;

  constructor(private http: HttpClient) {}

  getColleges(): Observable<{ collegeId: string; name: string }[]> {
    if (!this.cachedColleges$) {
      this.cachedColleges$ = this.http
        .get<{ collegeId: string; name: string }[]>("http://localhost:8080/api/colleges/getIdsAndNames")
        .pipe(shareReplay(1)); // cache the result
    }

    return this.cachedColleges$;
  }
}
