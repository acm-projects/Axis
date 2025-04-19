// core/services/document.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

import {Bookmark} from '../models/bookmark.model'


@Injectable({ providedIn: 'root' })
export class BookmarksService {
  private baseUrl = 'http://localhost:8080/api/bookmarks';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCollegeBookmarks(email: string) : Observable<Bookmark[]>{
    const token = this.authService.getSession()?.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Bookmark[]>(`${this.baseUrl}/getCollegeBookmarks/${email}`, { headers });
  }

  getScholarshipBookmarks(email: string) : Observable<Bookmark[]>{
    const token = this.authService.getSession()?.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Bookmark[]>(`${this.baseUrl}/getScholarshipBookmarks/${email}`, { headers });
  }

  getBookmarks(email: string): Observable<Bookmark[]> {
    const token = this.authService.getSession()?.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Bookmark[]>(`${this.baseUrl}/getBookmarks/${email}`, { headers });
  }

  bookmarkScholarship(email: string, id: number): Observable<any> {
    const token = this.authService.getSession()?.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = new HttpParams()
      .set('email', email)
      .set('id', id);

    return this.http.post(`${this.baseUrl}/addScholarship`, null, { headers, params });
  }

  bookmarkCollege(email: string, id: number): Observable<any> {
    const token = this.authService.getSession()?.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = new HttpParams()
      .set('email', email)
      .set('id', id);

    return this.http.post(`${this.baseUrl}/addCollege`, null, { headers, params });
  }

  removeBookmarkCollege(email:string, id: number): Observable<any> {
    const token = this.authService.getSession()?.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = new HttpParams()
      .set("email", email)
      .set("id", id)

    return this.http.delete(
      `${this.baseUrl}/removeCollege`,
      { headers, params }
    )
  }


  removeBookmarkScholarship(email:string, id: number): Observable<any> {
    const token = this.authService.getSession()?.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = new HttpParams()
      .set("email", email)
      .set("id", id)

    return this.http.delete(
      `${this.baseUrl}/removeScholarship`,
      { headers, params }
    )

  }


}
