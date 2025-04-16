// core/services/document.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

export interface Document {
  document_id: number;
  student_email: string;
  college_id: number;
  filename: string;
  fileUrl: string;
}


@Injectable({ providedIn: 'root' })
export class DocumentService {
  private baseUrl = 'http://localhost:8080/api/documents';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getGroupedDocumentsByCollege(email: string): Observable<Record<string, Document[]>> {
    const token = this.authService.getSession()?.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Record<string, Document[]>>(`${this.baseUrl}/getGroupedByCollege/${email}`, { headers });
  }

}
