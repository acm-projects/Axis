import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-account',
  imports: [NgFor],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})
export class UserAccountComponent {
  userInfo: any = {
    firstName: "High",
    lastName: "Schooler",
    userName: "coolHighSchooler",
    email: "coolpool@gmail.com",
    phoneNumber: "4699276108",
    satScore: 1540,
    GPA: 4,
    documents: [1,2,3,4]
  }

  documents: any[] = ["Resume", "Transcript", "Transfer Credits", "AP Scores", "Recommendation Letter 1", "Recommendation Letter 2", "Personal Essay"]

  @Output() closeMyAccountEvent = new EventEmitter<void>();

  outerDivClick(): void {
    this.closeMyAccountEvent.emit()
  }

  innerDivClick(event: MouseEvent) {
    event.stopPropagation()
  }
}

