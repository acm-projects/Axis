import { NgClass, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Student, StudentInfo } from '../../core/models/student.model';
import { FormsModule } from '@angular/forms';
import { DocumentInfo } from '../../core/models/document.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-account',
  imports: [NgFor, FormsModule, NgClass, RouterLink],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})
export class UserAccountComponent {

  currentUser: Student = new Student()

  editing: boolean = false
  saved: boolean = false

  baseUrl : string = "http://localhost:8080/api/students"
  docUrl : string = "http://localhost:8080/api/documents/getDocuments"
  
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
    this.getStudentDocumentInfo()
  }

  getStudentInfo() : void {
    this.http.get<StudentInfo>(`${this.baseUrl}/${this.authService.getSession()?.email}`).subscribe({
      next: (response : StudentInfo) => {
        this.currentUser = new Student(response)
      },
      error: (err) => console.error('Error fetching student:', err)
    })
  }

  getStudentDocumentInfo() : void {
    //${this.authService.getSession()?.email}
    //https://axisdocuments.s3.us-west-2.amazonaws.com/kevinphilip2004%40gmail.com/35/CS4141_Pre1_lxv220012.pdf
    this.http.get<DocumentInfo[]>(`${this.docUrl}/kevinphilip2004@gmail.com`).subscribe({
      next: (response: DocumentInfo[]) => {
       this.studentDocumentInfo = response
      },
      error: (error) => {
        console.error("Error retreving documents")
      }
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
          console.error("Error updating user data: " + error)
          this.getStudentInfo()
        }
      })
    } 
    this.editing = !this.editing
  }
  studentDocumentInfo: DocumentInfo[] = []
  
}

