import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {DocumentService} from '../../core/services/document.service';
import {DocumentCardComponent} from '../../shared/components/document-list-item/document-list-item.component';
import { Document } from '../../core/services/document.service';
import {DocumentUploadOverlayComponent} from '../add-document/add-document.component';
import {BookmarksService} from '../../core/services/bookmarks.service';
import {ResourceHeaderComponent} from '../../shared/components/resource-header/resource-header.component';
import {AssetCardComponent} from '../../shared/components/asset-card/asset-card.component';
import {Bookmark} from '../../core/models/bookmark.model';
import {CollegeService} from '../../core/services/college.service';
import {ScholarshipsService} from '../../core/services/scholarships.service';
import {College} from '../../core/models/college.model';
import {Scholarship} from '../../core/models/scholarship.model';

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
  imports: [CommonModule, DocumentCardComponent, DocumentUploadOverlayComponent, ResourceHeaderComponent, AssetCardComponent],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css',
  standalone: true
})
export class UserAccountComponent implements OnInit{
  account: Session | null = null;
  groupedDocuments: Record<string, Document[]> = {};
  bookmarks: Bookmark[] = [];
  objectKeys = Object.keys;
  showUpload = false;
  collegesBookmarked: College[] = [];
  scholarshipsBookmarked: Scholarship[] = [];


  constructor(
    private documentService: DocumentService,
    private bookmarkService: BookmarksService,
    private authService: AuthService,
    private collegeService: CollegeService,
    private scholarshipService: ScholarshipsService
  ) {}



  ngOnInit() {
    this.account = this.authService.getSession();

    this.loadDocuments();
    this.loadBookmarks();
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

  loadBookmarks() {
    const email = this.account?.email;
    if (email) {
      this.collegesBookmarked = [];
      this.scholarshipsBookmarked = [];
      this.bookmarkService.getBookmarks(email).subscribe({
        next: bookmarks => {
          const collegeIds = bookmarks
            .filter(b => b.bookmark_type === 'college')
            .map(b => b.id);
          const scholarshipIds = bookmarks
            .filter(b => b.bookmark_type === 'scholarship')
            .map(b => b.id);

          collegeIds.forEach(id =>
            this.collegeService.getCollegeById(id).subscribe(college => {
                college.isBookmarked = true;
                this.collegesBookmarked.push(college);
              }
            )
          );

          scholarshipIds.forEach(id =>
            this.scholarshipService.getScholarshipById(id).subscribe(scholarship => {
                scholarship.isBookmarked = true;
                this.scholarshipsBookmarked.push(scholarship)
              }
            )
          );
        },
        error: err => console.error('Failed to load bookmarks:', err)
      });
    }
  }


  protected readonly sessionStorage = sessionStorage;
}

