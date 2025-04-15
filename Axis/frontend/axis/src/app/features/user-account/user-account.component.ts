import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {DocumentService} from '../../core/services/document.service';
import {DocumentCardComponent} from '../../shared/components/document-list-item/document-list-item.component';
import { Document } from '../../core/services/document.service';
import {DocumentUploadOverlayComponent} from '../add-document/add-document.component';


interface Session {
  email: string;
  token: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  gpa: string;
  satScore: string;
  actScore: string;
}

@Component({
  selector: 'app-user-account',
  imports: [CommonModule, DocumentCardComponent, DocumentUploadOverlayComponent],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css',
  standalone: true
})
export class UserAccountComponent implements OnInit{
  account: Session | null = null;
  groupedDocuments: Record<string, Document[]> = {};
  objectKeys = Object.keys;
  showUpload = false;


  constructor(
    private documentService: DocumentService,
    private authService: AuthService
  ) {}



  ngOnInit() {
    this.account = this.authService.getSession();

    this.loadDocuments();
  }


  loadDocuments() {
    const email = this.account?.email;
    if (email) {
      this.documentService.getGroupedDocumentsByCollege(email).subscribe({
        next: grouped => this.groupedDocuments = grouped,
        error: err => console.error('Failed to load grouped documents:', err)
      });
    }
  }

  protected readonly sessionStorage = sessionStorage;
}

