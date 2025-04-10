import { NgClass, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Student, StudentInfo } from '../../core/models/student.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-account',
  imports: [NgFor, FormsModule, NgClass],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})
export class UserAccountComponent {

  currentUser: Student = new Student()

  editing: boolean = false
  saved: boolean = false

  baseUrl : string = "http://localhost:8080/api/students"
  constructor (private http: HttpClient, private authService: AuthService) {}

  @Output() closeMyAccountEvent = new EventEmitter<void>();

  outerDivClick(): void {
    this.closeMyAccountEvent.emit()
  }

  innerDivClick(event: MouseEvent) {
    event.stopPropagation()
  }
  
  ngOnInit() {
    this.getStudentInfo()
  }

  getStudentInfo() : void {
    this.http.get<StudentInfo>(`${this.baseUrl}/${this.authService.getSession()?.email}`).subscribe({
      next: (response : StudentInfo) => {
        this.currentUser = new Student(response)
      },
      error: (err) => console.error('Error fetching student:', err)
    })
  }

  toggleEdit() : void {
    if (this.editing) {
      if (!this.currentUser.studentInfo.email) {
        console.error('Email is missing in currentUser object');
        return;
      }
      
      this.http.put(`${this.baseUrl}/${this.authService.getSession()?.email}`, this.currentUser.studentInfo).subscribe({
        complete: () => {
          this.saved = true;
        },
        error: (error) => {
          console.log("Error updating user data: " + error)
          this.getStudentInfo()
        }
      })
    } 
    this.editing = !this.editing
  }
  documents: any[] = ["Resume", "Transcript", "Transfer Credits", "AP Scores", "Recommendation Letter 1", "Recommendation Letter 2", "Personal Essay"]

  
}

