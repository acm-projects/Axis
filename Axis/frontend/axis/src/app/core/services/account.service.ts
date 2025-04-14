import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export interface Account {
  email: String;
  firstName: String;
  lastName: String;
  phoneNumber?: String;
  gpa: String;
  satScore: String;
  actScore: String;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // Use the environment configuration for the base URL
  private baseUrl = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) { }

  // This method fetches account details based on the primary key (e.g., user id or email)
  getAccountDetails(primaryKey: string): Observable<Account> {
    // Adjust the URL as needed to match your backend routing. For example:
    return this.http.get<Account>(`${this.baseUrl}/account/${primaryKey}`);
  }
}
