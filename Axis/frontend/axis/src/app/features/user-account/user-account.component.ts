import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Student, StudentInfo } from '../../core/models/student.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-account',
  imports: [NgFor, FormsModule],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})
export class UserAccountComponent {

  currentUser: Student = new Student()

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
    this.http.get<StudentInfo>(`${this.baseUrl}/${this.authService.getSession()?.email}`).subscribe({
      next: (response : StudentInfo) => {
        this.currentUser = new Student(response)
      },
      error: (err) => console.error('Error fetching student:', err)
    })
  }
  documents: any[] = ["Resume", "Transcript", "Transfer Credits", "AP Scores", "Recommendation Letter 1", "Recommendation Letter 2", "Personal Essay"]
}

