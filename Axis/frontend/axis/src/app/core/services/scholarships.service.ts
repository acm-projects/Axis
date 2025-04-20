import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';
import {Scholarship} from '../models/scholarship.model';
import {Bookmark} from '../models/bookmark.model';
import {College} from '../models/college.model';
@Injectable({
  providedIn: 'root'
})
export class ScholarshipsService {

  constructor(private http: HttpClient) {}

  getScholarshipById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/scholarships/searchByID/${id}`);
  }


}
